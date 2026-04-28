// Mutaxasis ishchilar — Savat API (xavfsiz)

const express = require('express');
const router = express.Router();
const db = require('../database');
const { validateUserId, sanitize } = require('../middleware/security');

router.use('/:userId', validateUserId);

// Savatni olish
router.get('/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const rows = db.prepare('SELECT * FROM cart WHERE user_id = ?').all(userId);
    const cart = rows.map(r => ({
      id: r.product_id,
      quantity: Math.min(999, Math.max(1, r.quantity)),
      price: Math.max(0, r.price),
      ...(r.product_data ? JSON.parse(r.product_data) : {})
    }));
    res.json(cart);
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Savatga qo'shish
router.post('/:userId', (req, res) => {
  try {
    const { productId, quantity = 1, price, productData } = req.body;
    if (!productId || price == null || price < 0) {
      return res.status(400).json({ error: 'productId va to\'g\'ri price kerak' });
    }
    const userId = parseInt(req.params.userId, 10);
    const safeProductId = String(productId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
    const qty = Math.min(999, Math.max(1, parseInt(quantity, 10) || 1));
    const safePrice = Math.max(0, parseInt(price, 10) || 0);
    let safeProductData = null;
    if (productData && typeof productData === 'object') {
      safeProductData = JSON.stringify({
        name: sanitize(productData.name || '', 200),
        image: typeof productData.image === 'string' ? productData.image.slice(0, 500) : ''
      });
    }
    const existing = db.prepare('SELECT * FROM cart WHERE user_id = ? AND product_id = ?').get(userId, safeProductId);
    if (existing) {
      const newQty = Math.min(999, existing.quantity + qty);
      db.prepare('UPDATE cart SET quantity = ?, price = ?, product_data = ? WHERE id = ?')
        .run(newQty, safePrice, safeProductData || existing.product_data, existing.id);
    } else {
      db.prepare('INSERT INTO cart (user_id, product_id, quantity, price, product_data) VALUES (?, ?, ?, ?, ?)')
        .run(userId, safeProductId, qty, safePrice, safeProductData);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Savatdan o'chirish
router.delete('/:userId/:productId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const productId = String(req.params.productId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
    db.prepare('DELETE FROM cart WHERE user_id = ? AND product_id = ?').run(userId, productId);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Miqdorni o'zgartirish
router.put('/:userId/:productId', (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = parseInt(req.params.userId, 10);
    const productId = String(req.params.productId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      db.prepare('DELETE FROM cart WHERE user_id = ? AND product_id = ?').run(userId, productId);
    } else {
      db.prepare('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?')
        .run(Math.min(999, qty), userId, productId);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Savatni tozalash
router.delete('/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    db.prepare('DELETE FROM cart WHERE user_id = ?').run(userId);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
