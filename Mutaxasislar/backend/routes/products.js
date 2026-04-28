// Mutaxasis ishchilar — Mahsulotlar API (xavfsiz)

const express = require('express');
const router = express.Router();
const db = require('../database');
const { sanitize } = require('../middleware/security');

const VALID_CATEGORIES = ['kulolchilik','naqsh','duradgorlik','zargarlik','teri','qolda','metall','tikuvchilik','gilam','badiiy','mashina'];

function isValidImageUrl(s) {
  if (typeof s !== 'string' || !s.trim()) return false;
  const ok = s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:image');
  if (!ok) return false;
  // base64 rasm 8MB gacha (server limit 10MB), URL ~5000 belgi
  const maxLen = s.startsWith('data:') ? 8 * 1024 * 1024 : 5000;
  return s.length <= maxLen;
}

// Barcha mahsulotlarni olish
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT p.id, p.user_id as userId, p.name, p.phone, p.owner_name as ownerName,
             p.image, p.image2, p.image3, p.category_id as categoryId, p.subcategory_id as subcategoryId
      FROM products p ORDER BY p.id DESC
    `).all();
    const products = rows.map(r => ({
      id: r.id,
      userId: r.userId,
      name: r.name,
      phone: r.phone,
      ownerName: r.ownerName,
      image: r.image,
      image2: r.image2 || undefined,
      image3: r.image3 || undefined,
      images: [r.image, r.image2, r.image3].filter(Boolean),
      categoryId: r.categoryId,
      subcategoryId: r.subcategoryId || undefined
    }));
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Foydalanuvchi mahsulotlarini olish
router.get('/user/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId) || userId <= 0) return res.status(400).json({ error: 'Noto\'g\'ri userId' });
    const rows = db.prepare(`
      SELECT id, user_id as userId, name, phone, owner_name as ownerName,
             image, image2, image3, category_id as categoryId, subcategory_id as subcategoryId
      FROM products WHERE user_id = ? ORDER BY id DESC
    `).all(userId);
    res.json(rows.map(r => ({
      ...r,
      images: [r.image, r.image2, r.image3].filter(Boolean)
    })));
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// Mahsulot qo'shish
router.post('/', (req, res) => {
  try {
    const { userId, name, phone, ownerName, image, image2, image3, categoryId, subcategoryId } = req.body;
    if (!userId || !name || !phone || !ownerName || !image || !categoryId) {
      return res.status(400).json({ error: 'Barcha majburiy maydonlar to\'ldirilishi kerak' });
    }
    const uid = parseInt(userId, 10);
    if (isNaN(uid) || uid <= 0) return res.status(400).json({ error: 'Noto\'g\'ri userId' });
    if (!VALID_CATEGORIES.includes(String(categoryId))) {
      return res.status(400).json({ error: 'Noto\'g\'ri turkum' });
    }
    if (!isValidImageUrl(image)) return res.status(400).json({ error: 'Rasm URL yoki base64 noto\'g\'ri' });
    const safeName = sanitize(name, 300);
    const safePhone = sanitize(phone, 20);
    const safeOwner = sanitize(ownerName, 100);
    const safeImg = image;
    const safeImg2 = image2 && isValidImageUrl(image2) ? image2 : null;
    const safeImg3 = image3 && isValidImageUrl(image3) ? image3 : null;
    const safeSub = subcategoryId ? sanitize(subcategoryId, 50) : null;
    const stmt = db.prepare(`
      INSERT INTO products (user_id, name, phone, owner_name, image, image2, image3, category_id, subcategory_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(uid, safeName, safePhone, safeOwner, safeImg, safeImg2, safeImg3, categoryId, safeSub);
    const row = db.prepare('SELECT id, user_id as userId, name, phone, owner_name as ownerName, image, image2, image3, category_id as categoryId, subcategory_id as subcategoryId FROM products WHERE id = ?').get(result.lastInsertRowid);
    if (!row) return res.status(500).json({ error: 'Server xatosi' });
    res.json({ success: true, product: { ...row, images: [row.image, row.image2, row.image3].filter(Boolean) } });
  } catch (e) {
    console.error('Mahsulot qo\'shish xato:', e.message);
    res.status(500).json({ error: e.message || 'Server xatosi' });
  }
});

// Mahsulot o'chirish
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'Noto\'g\'ri ID' });
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);
    if (result.changes === 0) return res.status(404).json({ error: 'Mahsulot topilmadi' });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
