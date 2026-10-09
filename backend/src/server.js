require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');
const db = require('./db');
const { signUser, requireAuth, requireRole } = require('./auth');

const app = express();
const port = Number(process.env.PORT || 3000);
const uploadRoot = path.resolve(process.env.UPLOAD_DIR || path.join(__dirname, '..', 'public', 'uploads'));
fs.mkdirSync(uploadRoot, { recursive: true });

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(uploadRoot, { maxAge: '7d', immutable: true }));

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith('image/'))
});

const validSections = new Set(['kemahasiswaan', 'eksternal', 'berita']);
const validStatuses = new Set(['pending', 'published', 'inactive']);

function slugify(value) {
  return value.toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'artikel';
}

function uniqueSlug(title, currentId) {
  const base = slugify(title);
  let slug = base;
  let suffix = 2;
  while (true) {
    const found = db.prepare('SELECT id FROM articles WHERE slug = ?').get(slug);
    if (!found || found.id === currentId) return slug;
    slug = `${base}-${suffix++}`;
  }
}

function normalizeArticle(row) {
  if (!row) return row;
  return { ...row, imageUrl: row.image_url, publishedAt: row.published_at, createdAt: row.created_at, updatedAt: row.updated_at, authorId: row.author_id };
}

function pagination(req) {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(50, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 6));
  return { page, pageSize, offset: (page - 1) * pageSize };
}

function articleFilter(req, admin) {
  const clauses = [];
  const values = [];
  if (req.query.section && validSections.has(req.query.section)) { clauses.push('section = ?'); values.push(req.query.section); }
  if (admin && req.query.status && validStatuses.has(req.query.status)) { clauses.push('status = ?'); values.push(req.query.status); }
  if (!admin) { clauses.push("status = 'published'"); }
  if (req.query.search) { clauses.push('(title LIKE ? OR description LIKE ?)'); values.push(`%${req.query.search}%`, `%${req.query.search}%`); }
  return { where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', values };
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/auth/login', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  const user = db.prepare('SELECT id, email, password_hash, role FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ message: 'Email atau password salah.' });
  return res.json({ token: signUser(user), user: { id: user.id, email: user.email, role: user.role } });
});

app.get('/api/auth/me', requireAuth, (req, res) => res.json({ user: req.user }));

app.get('/api/articles', (req, res) => {
  const { page, pageSize, offset } = pagination(req);
  const filter = articleFilter(req, false);
  const total = db.prepare(`SELECT COUNT(*) AS count FROM articles ${filter.where}`).get(...filter.values).count;
  const rows = db.prepare(`SELECT id, section, title, slug, description, body, image_url, status, published_at, created_at, updated_at FROM articles ${filter.where} ORDER BY COALESCE(published_at, created_at) DESC LIMIT ? OFFSET ?`).all(...filter.values, pageSize, offset);
  return res.json({ data: rows.map(normalizeArticle), pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } });
});

app.get('/api/articles/:slug', (req, res) => {
  const row = db.prepare("SELECT id, section, title, slug, description, body, image_url, status, published_at, created_at, updated_at FROM articles WHERE slug = ? AND status = 'published'").get(req.params.slug);
  return row ? res.json({ article: normalizeArticle(row) }) : res.status(404).json({ message: 'Artikel tidak ditemukan.' });
});

app.get('/api/admin/insights', requireAuth, (req, res) => {
  const role = req.user.role;
  const counts = db.prepare("SELECT section, status, COUNT(*) AS count FROM articles GROUP BY section, status").all();
  const users = role === 'superadmin' ? db.prepare('SELECT COUNT(*) AS count FROM users').get().count : undefined;
  return res.json({ counts, users });
});

app.get('/api/admin/articles', requireAuth, (req, res) => {
  const { page, pageSize, offset } = pagination(req);
  const filter = articleFilter(req, true);
  const total = db.prepare(`SELECT COUNT(*) AS count FROM articles ${filter.where}`).get(...filter.values).count;
  const rows = db.prepare(`SELECT a.*, u.email AS author_email FROM articles a JOIN users u ON u.id = a.author_id ${filter.where ? filter.where.replaceAll('section', 'a.section').replaceAll('status', 'a.status').replaceAll('title', 'a.title').replaceAll('description', 'a.description') : ''} ORDER BY a.updated_at DESC LIMIT ? OFFSET ?`).all(...filter.values, pageSize, offset);
  return res.json({ data: rows.map(normalizeArticle), pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } });
});

app.get('/api/admin/articles/:id', requireAuth, (req, res) => {
  const row = db.prepare('SELECT a.*, u.email AS author_email FROM articles a JOIN users u ON u.id = a.author_id WHERE a.id = ?').get(Number(req.params.id));
  return row ? res.json({ article: normalizeArticle(row) }) : res.status(404).json({ message: 'Artikel tidak ditemukan.' });
});

async function saveImage(file) {
  if (!file) return null;
  const filename = `${crypto.randomUUID()}.webp`;
  const target = path.join(uploadRoot, filename);
  await sharp(file.buffer).rotate().resize({ width: 1600, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78, effort: 4 }).toFile(target);
  return `/uploads/${filename}`;
}

function validateArticle(body) {
  const section = String(body.section || '');
  const title = String(body.title || '').trim();
  const description = String(body.description || '').trim();
  const articleBody = String(body.body || '').trim();
  const status = body.status ? String(body.status) : 'pending';
  const errors = {};
  if (!validSections.has(section)) errors.section = 'Pilih rubrik yang valid.';
  if (title.length < 5 || title.length > 160) errors.title = 'Judul harus 5–160 karakter.';
  if (description.length < 20 || description.length > 320) errors.description = 'Deskripsi harus 20–320 karakter.';
  if (articleBody.length < 30) errors.body = 'Isi artikel minimal 30 karakter.';
  if (!validStatuses.has(status)) errors.status = 'Status artikel tidak valid.';
  return { errors, section, title, description, articleBody, status };
}

app.post('/api/admin/articles', requireAuth, requireRole('admin', 'superadmin'), imageUpload.single('image'), async (req, res) => {
  try {
    const input = validateArticle(req.body);
    if (Object.keys(input.errors).length) return res.status(422).json({ message: 'Periksa isian artikel.', errors: input.errors });
    const imageUrl = await saveImage(req.file);
    const now = new Date().toISOString();
    const result = db.prepare('INSERT INTO articles (section, title, slug, description, body, image_url, status, author_id, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(input.section, input.title, uniqueSlug(input.title), input.description, input.articleBody, imageUrl, input.status, req.user.id, input.status === 'published' ? now : null, now, now);
    return res.status(201).json({ article: normalizeArticle(db.prepare('SELECT * FROM articles WHERE id = ?').get(result.lastInsertRowid)) });
  } catch (error) { return res.status(error.code === 'LIMIT_FILE_SIZE' ? 413 : 422).json({ message: 'Artikel atau gambar tidak dapat diproses.' }); }
});

app.patch('/api/admin/articles/:id', requireAuth, requireRole('admin', 'superadmin'), imageUpload.single('image'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ message: 'Artikel tidak ditemukan.' });
    const input = validateArticle({ ...existing, ...req.body, body: req.body.body ?? existing.body, section: req.body.section ?? existing.section });
    if (Object.keys(input.errors).length) return res.status(422).json({ message: 'Periksa isian artikel.', errors: input.errors });
    const imageUrl = req.file ? await saveImage(req.file) : existing.image_url;
    const now = new Date().toISOString();
    db.prepare('UPDATE articles SET section = ?, title = ?, slug = ?, description = ?, body = ?, image_url = ?, status = ?, published_at = ?, updated_at = ? WHERE id = ?').run(input.section, input.title, uniqueSlug(input.title, id), input.description, input.articleBody, imageUrl, input.status, input.status === 'published' ? (existing.published_at || now) : null, now, id);
    return res.json({ article: normalizeArticle(db.prepare('SELECT * FROM articles WHERE id = ?').get(id)) });
  } catch (error) { return res.status(error.code === 'LIMIT_FILE_SIZE' ? 413 : 422).json({ message: 'Artikel atau gambar tidak dapat diproses.' }); }
});

app.patch('/api/admin/articles/:id/status', requireAuth, requireRole('admin', 'superadmin'), (req, res) => {
  const status = String(req.body?.status || '');
  if (!validStatuses.has(status)) return res.status(422).json({ message: 'Status artikel tidak valid.' });
  const result = db.prepare("UPDATE articles SET status = ?, published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, ?) ELSE NULL END, updated_at = ? WHERE id = ?").run(status, status, new Date().toISOString(), new Date().toISOString(), Number(req.params.id));
  if (!result.changes) return res.status(404).json({ message: 'Artikel tidak ditemukan.' });
  return res.json({ article: normalizeArticle(db.prepare('SELECT * FROM articles WHERE id = ?').get(Number(req.params.id))) });
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ message: 'Ukuran foto maksimal 10 MB.' });
  if (error?.message === 'LIMIT_UNEXPECTED_FILE') return res.status(422).json({ message: 'Field upload foto tidak valid.' });
  return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
});
app.listen(port, () => console.log(`BEM FH API running at http://localhost:${port}`));
