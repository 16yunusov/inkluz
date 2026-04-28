// Mutaxasis ishchilar — Backend server (rate limit yo'q)

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const db = require('./database');
const authRouter = require('./routes/auth');
const accountsRouter = require('./routes/accounts');
const cartRouter = require('./routes/cart');
const favoritesRouter = require('./routes/favorites');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  region TEXT DEFAULT 'Toshkent',
  tuman TEXT
);
CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  price REAL DEFAULT 0,
  product_data TEXT,
  UNIQUE(user_id, product_id)
);
CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER NOT NULL,
  product_id TEXT NOT NULL,
  PRIMARY KEY (user_id, product_id)
);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  user_id INTEGER,
  items TEXT NOT NULL,
  total_price REAL NOT NULL,
  payment_type TEXT DEFAULT 'naqt',
  nasiya_months INTEGER,
  pochta_id TEXT,
  viloyat TEXT,
  tuman TEXT,
  pochta_joyi TEXT,
  delivery_point TEXT,
  date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ism TEXT NOT NULL,
  familyasi TEXT NOT NULL,
  phone TEXT NOT NULL,
  nickname TEXT UNIQUE NOT NULL,
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  image TEXT NOT NULL,
  image2 TEXT,
  image3 TEXT,
  category_id TEXT NOT NULL,
  subcategory_id TEXT
);
`;

async function main() {
  const database = await db.initDb();
  database.exec(SCHEMA);

  const app = express();
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: CORS_ORIGIN }));
  app.use(express.json({ limit: '10mb' }));

  app.get('/api/health', (req, res) => res.json({ ok: true }));

  app.use('/api/auth', authRouter);
  app.use('/api/accounts', accountsRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/favorites', favoritesRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/products', productsRouter);

  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  function tryListen(port) {
    const server = app.listen(port, () => {
      console.log(`Mutaxasis backend: http://localhost:${port}`);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} band, ${port + 1} sinanmoqda...`);
        tryListen(port + 1);
      } else throw err;
    });
  }
  tryListen(PORT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
