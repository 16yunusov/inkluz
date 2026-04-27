const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const orders = [];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'taste-of-uzbekistan' });
});

app.post('/api/orders', (req, res) => {
  const { name, phone, address, payment, items, total } = req.body;

  if (!name || !phone || !address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ message: 'Maʼlumotlar toʻliq emas.' });
  }

  const order = {
    id: orders.length + 1,
    name,
    phone,
    address,
    payment,
    items,
    total,
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  res.status(201).json({ message: 'Buyurtma qabul qilindi.', orderId: order.id });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Static fayllar (HTML, CSS, JS, sitemap, robots) – API dan keyin
app.use(express.static(path.join(__dirname), { index: ['index.html'] }));

app.listen(PORT, () => {
  const host = 'http://localhost';
  const base = `${host}:${PORT}`;
  console.log('');
  console.log('  Taste of Uzbekistan backend ishga tushdi.');
  console.log('');
  console.log('  Sayt linki:     ' + base);
  console.log('  Admin panel:    ' + base + '/admin.html');
  console.log('');
  console.log('  Brauzerda ochish uchun yuqoridagi linkni nusxalang yoki bosib oting.');
  console.log('');
});

