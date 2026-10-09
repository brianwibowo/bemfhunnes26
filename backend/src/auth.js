const jwt = require('jsonwebtoken');
const db = require('./db');

const secret = process.env.JWT_SECRET || 'development-only-change-this-secret';

function signUser(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, secret, { expiresIn: '8h' });
}

function requireAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Autentikasi diperlukan.' });
  try {
    const claims = jwt.verify(token, secret);
    const user = db.prepare('SELECT id, email, role FROM users WHERE id = ?').get(claims.sub);
    if (!user) return res.status(401).json({ message: 'Sesi tidak valid.' });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Sesi telah berakhir. Silakan masuk kembali.' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'Akses tidak diizinkan.' });
}

module.exports = { signUser, requireAuth, requireRole };
