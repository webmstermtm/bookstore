const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data/users');
const { SECRET } = require('../middleware/auth');

const router = express.Router();

/**
 * Task 6: Register New user – 3 Points
 * POST /auth/register
 * body: { username, password }
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ error: 'username already taken' });

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash });
  res.status(201).json({ message: 'registered', username });
});

/**
 * Task 7: Login as a Registered user - 3 Points
 * POST /auth/login
 * body: { username, password }
 * returns: { token }
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;
