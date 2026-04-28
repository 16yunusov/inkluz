// Mutaxasis ishchilar — Akauntlar API (ism, familya, telefon, nickname)

const express = require('express');
const router = express.Router();
const db = require('../database');
const { sanitize } = require('../middleware/security');

// Barcha akauntlarni olish
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT id, ism, familyasi, phone, nickname, avatar, created_at
      FROM accounts ORDER BY id ASC
    `).all();
    const byId = {};
    rows.forEach(r => {
      byId[r.id] = {
        id: r.id,
        ism: r.ism,
        familyasi: r.familyasi,
        phone: r.phone,
        nickname: r.nickname,
        avatar: r.avatar || undefined,
        created_at: r.created_at
      };
    });
    res.json(byId);
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Bitta akauntni olish
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Noto\'g\'ri ID' });
    }
    const row = db.prepare(`
      SELECT id, ism, familyasi, phone, nickname, avatar, created_at
      FROM accounts WHERE id = ?
    `).get(id);
    if (!row) return res.status(404).json({ error: 'Akaunt topilmadi' });
    res.json({
      id: row.id,
      ism: row.ism,
      familyasi: row.familyasi,
      phone: row.phone,
      nickname: row.nickname,
      avatar: row.avatar || undefined,
      created_at: row.created_at
    });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Akaunt yaratish
router.post('/', (req, res) => {
  try {
    const { ism, familyasi, phone, nickname } = req.body;
    if (!ism || !familyasi || !phone || !nickname) {
      return res.status(400).json({ error: 'Ism, familya, telefon va nickname to\'ldirilishi shart' });
    }
    const safeIsm = sanitize(String(ism).trim(), 100);
    const safeFamilya = sanitize(String(familyasi).trim(), 100);
    const safePhone = sanitize(String(phone).trim(), 20);
    const safeNick = sanitize(String(nickname || '').replace(/^@/, '').trim(), 50);
    if (!safeNick || safeNick.length < 2) {
      return res.status(400).json({ error: 'Nickname kamida 2 belgidan iborat bo\'lishi kerak' });
    }
    const existing = db.prepare('SELECT id FROM accounts WHERE nickname = ?').get(safeNick);
    if (existing) {
      return res.status(400).json({ error: 'Bu nickname allaqachon band' });
    }
    const result = db.prepare(`
      INSERT INTO accounts (ism, familyasi, phone, nickname, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).run(safeIsm, safeFamilya, safePhone, safeNick);
    const row = db.prepare('SELECT id, ism, familyasi, phone, nickname, created_at FROM accounts WHERE id = ?')
      .get(result.lastInsertRowid);
    res.json({ success: true, account: { ...row, created_at: row.created_at } });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Avatar yangilash
router.put('/:id/avatar', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'Noto\'g\'ri ID' });
    const { avatar } = req.body;
    const avatarStr = typeof avatar === 'string' && avatar.startsWith('data:image') ? avatar : null;
    db.prepare('UPDATE accounts SET avatar = ? WHERE id = ?').run(avatarStr, id);
    const row = db.prepare('SELECT id, ism, familyasi, phone, nickname, avatar, created_at FROM accounts WHERE id = ?').get(id);
    if (!row) return res.status(404).json({ error: 'Akaunt topilmadi' });
    res.json({ success: true, account: { ...row, avatar: row.avatar || undefined } });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
