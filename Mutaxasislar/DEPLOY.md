# Mutaxasis ishchilar — Hostga joylash

## Tayyorgarlik

1. **Node.js** 18+ o'rnatilgan bo'lishi kerak
2. Loyiha papkasini hostga yuklang

## Joylash

### 1-variant: Oddiy ishga tushirish

```bash
# Loyiha papkasiga o'ting
cd market

# O'rnatish
npm install
cd backend && npm install && cd ..

# Frontend nusxalash va server ishga tushirish
npm start
```

### 2-variant: PM2 bilan (tavsiya etiladi)

```bash
npm install -g pm2
npm run copy
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # Avtomatik qayta ishga tushirish
```

### 3-variant: Port o'zgartirish

```bash
PORT=8080 npm start
# yoki
export PORT=8080 && npm start
```

## Muhim

- **CORS**: Bir domen ostida frontend va backend bo'lsa, CORS muammosi bo'lmaydi
- **API URL**: Agar API boshqa domenda bo'lsa, `index.html` da `<script>window.MUTAXASIS_API_URL='https://api.example.com/api';</script>` qo'shing
- **Ma'lumotlar**: `backend/data/mutaxasis.db` — SQLite fayl, backup oling
