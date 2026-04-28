# Mutaxasis ishchilar — Backend (xavfsiz)

Foydalanuvchi ma'lumotlarini saqlash uchun Node.js + Express + SQLite backend.

## Xavfsizlik

- **bcrypt** — parol hash (10 salt rounds)
- **validator** — input sanitizatsiya (XSS oldini olish)
- **helmet** — HTTP xavfsizlik sarlavhalari

## O'rnatish

```bash
cd backend
npm install
```

## Ishga tushirish

```bash
npm start
```

Server `http://localhost:3001` da ishga tushadi.

## O'zgaruvchilar (ixtiyoriy)

| O'zgaruvchi | Default | Tavsif |
|-------------|---------|--------|
| PORT | 3001 | Server porti |
| CORS_ORIGIN | * | Ruxsat etilgan origin (production da o'zgartiring) |

## API

| Endpoint | Metod | Tavsif |
|---------|-------|--------|
| `/api/health` | GET | Server holati |
| `/api/auth/register` | POST | Ro'yxatdan o'tish |
| `/api/auth/login` | POST | Kirish |
| `/api/auth/profile/:id` | PUT | Profil yangilash |
| `/api/cart/:userId` | GET | Savatni olish |
| `/api/cart/:userId` | POST | Savatga qo'shish |
| `/api/cart/:userId/:productId` | PUT | Miqdorni o'zgartirish |
| `/api/cart/:userId/:productId` | DELETE | Savatdan o'chirish |
| `/api/favorites/:userId` | GET | Sevimlilarni olish |
| `/api/favorites/:userId` | POST | Sevimliga qo'shish |
| `/api/favorites/:userId/:productId` | DELETE | Sevimlidan o'chirish |
| `/api/orders?userId=1` | GET | Buyurtmalarni olish |
| `/api/orders` | POST | Buyurtma yaratish |

## Ma'lumotlar bazasi

SQLite fayl: `backend/data/mutaxasis.db` — avtomatik yaratiladi.
