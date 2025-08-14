const jwt = require('jsonwebtoken');

const SECRET = 'dev-secret-change-me'; // In real life use env var

function authRequired(req, res, next) {
  // Expect "Authorization: Bearer <token>"
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing Bearer token' });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload; // { username }
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authRequired, SECRET };
