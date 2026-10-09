const fs = require('node:fs');
const path = require('node:path');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');

const root = path.resolve(__dirname, '..');
const filename = path.resolve(process.env.DATABASE_FILE || path.join(root, 'data', 'bemfh.sqlite'));
fs.mkdirSync(path.dirname(filename), { recursive: true });

const db = new Database(filename);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('superadmin', 'admin')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL CHECK (section IN ('kemahasiswaan', 'eksternal', 'berita')),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    body TEXT NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'inactive')),
    author_id INTEGER NOT NULL REFERENCES users(id),
    published_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_articles_section_status ON articles(section, status, created_at DESC);
`);

function seedUser(email, password, role) {
  if (!email || !password) return;
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (!existing) {
    db.prepare('INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)').run(email, bcrypt.hashSync(password, 12), role);
  }
}

seedUser(process.env.SUPERADMIN_EMAIL, process.env.SUPERADMIN_PASSWORD, 'superadmin');
seedUser(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, 'admin');

module.exports = db;
