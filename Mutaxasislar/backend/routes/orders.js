// Mutaxasis ishchilar — Buyurtmalar API (xavfsiz)

const express = require('express');
const router = express.Router();
const db = require('../database');
const { sanitize } = require('../middleware/security');

// Buyurtmalarni olish
router.get('/', (req, res) => {
  try {
    const userId = req.query.userId;
    let rows;
    if (userId) {
      const uid = parseInt(userId, 10);
      if (isNaN(uid) || uid <= 0) {
        return res.status(400).json({ error: 'Noto\'g\'ri userId' });
      }
      rows = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(uid);
    } else {
      rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    }
    const orders = rows.map(r => ({
      id: r.id,
      orderId: r.order_id,
      items: JSON.parse(r.items),
      totalPrice: r.total_price,
      paymentType: r.payment_type,
      nasiyaMonths: r.nasiya_months,
      pochtaId: r.pochta_id,
      viloyat: r.viloyat,
      tuman: r.tuman,
      pochtaJoyi: r.pochta_joyi,
      deliveryPoint: r.delivery_point,
      date: r.date
    }));
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Buyurtma yaratish
router.post('/', (req, res) => {
  try {
    const { userId, orderId, items, totalPrice, paymentType, nasiyaMonths, pochtaId, viloyat, tuman, pochtaJoyi, deliveryPoint } = req.body;
    if (!orderId || !items || !Array.isArray(items) || totalPrice == null || totalPrice < 0) {
      return res.status(400).json({ error: 'orderId, items (massiv), totalPrice kerak' });
    }
    const safeOrderId = sanitize(String(orderId), 50);
    const safePaymentType = ['naqt', 'nasiya'].includes(paymentType) ? paymentType : 'naqt';
    const safeNasiyaMonths = [3, 6, 12, 24].includes(parseInt(nasiyaMonths, 10)) ? parseInt(nasiyaMonths, 10) : null;
    const uid = userId != null ? parseInt(userId, 10) : null;
    if (uid != null && (isNaN(uid) || uid <= 0)) {
      return res.status(400).json({ error: 'Noto\'g\'ri userId' });
    }
    const safeItems = items.slice(0, 100).map(item => ({
      ...item,
      name: sanitize(item.name || '', 200),
      quantity: Math.min(999, Math.max(1, parseInt(item.quantity, 10) || 1)),
      price: Math.max(0, parseInt(item.price, 10) || 0)
    }));
    const safeTotalPrice = Math.max(0, parseInt(totalPrice, 10) || 0);
    const date = new Date().toLocaleString('uz-UZ');
    db.prepare(`
      INSERT INTO orders (order_id, user_id, items, total_price, payment_type, nasiya_months, pochta_id, viloyat, tuman, pochta_joyi, delivery_point, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      safeOrderId,
      uid,
      JSON.stringify(safeItems),
      safeTotalPrice,
      safePaymentType,
      safeNasiyaMonths,
      sanitize(String(pochtaId || ''), 100),
      sanitize(String(viloyat || ''), 50),
      sanitize(String(tuman || ''), 50),
      sanitize(String(pochtaJoyi || ''), 100),
      sanitize(String(deliveryPoint || ''), 200),
      date
    );
    res.json({ success: true, orderId: safeOrderId, date });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
