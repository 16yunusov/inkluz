// Mutaxasis ishchilar — Sevimlilar API (xavfsiz)

const express = require('express');
const router = express.Router();
const db = require('../database');
const { validateUserId } = require('../middleware/security');

router.use('/:userId', validateUserId);

// Sevimlilarni olish
router.get('/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const rows = db.prepare('SELECT product_id FROM favorites WHERE user_id = ?').all(userId);
    res.json(rows.map(r => r.product_id));
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Qo'shish
router.post('/:userId', (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId kerak' });
    const userId = parseInt(req.params.userId, 10);
    const safeProductId = String(productId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
    db.prepare('INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)').run(userId, safeProductId);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// O'chirish
router.delete('/:userId/:productId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const productId = String(req.params.productId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND product_id = ?').run(userId, productId);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
