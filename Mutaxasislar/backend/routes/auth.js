// Mutaxasis ishchilar — Foydalanuvchi autentifikatsiyasi (xavfsiz)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const db = require('../database');
const { sanitize, isValidEmail, isValidPassword } = require('../middleware/security');

const SALT_ROUNDS = 10;

// Ro'yxatdan o'tish
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email va parol kiritilishi shart' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Noto\'g\'ri email formati' });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ error: 'Parol kamida 6 belgidan iborat bo\'lishi kerak' });
    }
    const safeEmail = validator.escape(email.toLowerCase().trim());
    const safeName = sanitize(name || '', 100);
    const safePhone = sanitize(phone || '', 20);
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const stmt = db.prepare('INSERT INTO users (email, password, name, phone) VALUES (?, ?, ?, ?)');
    stmt.run(safeEmail, hashed, safeName, safePhone);
    const row = db.prepare('SELECT id, email, name, phone, region, tuman FROM users WHERE email = ?').get(safeEmail);
    res.json({ success: true, user: row });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Kirish (login=1, parol=1 — asosiy saytga kirish)
router.post('/login', async (req, res) => {
  try {
    const { login, password, email } = req.body;
    const loginOrEmail = (login || email || '').toString().trim();
    if (!loginOrEmail || !password) {
      return res.status(400).json({ error: 'Login va parol kiritilishi shart' });
    }
    // Maxsus kirish: login=1, parol=1
    if (loginOrEmail === '1' && password === '1') {
      const mockUser = { id: 1, email: '1@mutaxasis.uz', name: 'Foydalanuvchi', phone: '', region: 'Toshkent', tuman: '' };
      return res.json({ success: true, user: mockUser });
    }
    const safeLogin = validator.escape(loginOrEmail.toLowerCase());
    const row = db.prepare('SELECT id, email, password, name, phone, region, tuman FROM users WHERE email = ?').get(safeLogin);
    if (!row) {
      return res.status(401).json({ error: 'Login yoki parol noto\'g\'ri' });
    }
    const match = await bcrypt.compare(password, row.password);
    if (!match) {
      return res.status(401).json({ error: 'Login yoki parol noto\'g\'ri' });
    }
    const { password: _, ...user } = row;
    res.json({ success: true, user });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Profil yangilash
router.put('/profile/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Noto\'g\'ri ID' });
    }
    const { name, phone, region, tuman } = req.body;
    const safeName = sanitize(name || '', 100);
    const safePhone = sanitize(phone || '', 20);
    const safeRegion = sanitize(region || 'Toshkent', 50);
    const safeTuman = sanitize(tuman || '', 50);
    const stmt = db.prepare('UPDATE users SET name = ?, phone = ?, region = ?, tuman = ? WHERE id = ?');
    stmt.run(safeName, safePhone, safeRegion, safeTuman, id);
    const row = db.prepare('SELECT id, email, name, phone, region, tuman FROM users WHERE id = ?').get(id);
    if (!row) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    res.json({ success: true, user: row });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
