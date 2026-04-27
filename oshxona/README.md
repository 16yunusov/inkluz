# Taste of Uzbekistan

Zamonaviy restoran veb-sayti – menyu, galereya, kontaktlar, admin panel (taomlar va narxlarni boshqarish). Hostga chiqarish uchun barcha kerakli fayllar va sozlamalar tayyor.

---

## Loyiha tuzilishi

| Fayl / papka      | Vazifasi |
|-------------------|----------|
| `index.html`      | Asosiy sahifa (hero, menyu, galereya, kontakt) |
| `admin.html`      | Admin panel – taom qo‘shish, narx/rasm yangilash, o‘chirish |
| `styles.css`      | Barcha stillar va mavzu (qora/oq) |
| `not.js`          | Asosiy sayt logikasi (menyu, tema) |
| `admin.js`        | Admin panel logikasi (localStorage) |
| `server.js`       | Node.js server – statik fayllar + `/api/health`, `/api/orders` |
| `package.json`    | Node.js loyiha va `npm start` |
| `sitemap.xml`     | Qidiruv tizimlari uchun (domenni almashtiring) |
| `robots.txt`      | Botlar qoidalari (domenni almashtiring) |
| `404.html`        | Topilmagan sahifa |
| `.env.example`    | Muhit o‘zgaruvchilari namunasi |
| `netlify.toml`    | Netlify statik deploy |
| `vercel.json`     | Vercel Node.js deploy |
| `render.yaml`     | Render.com deploy |

---

## Lokal ishga tushirish

```bash
cd oshxona
npm install
npm start
```

Brauzerda: **http://localhost:4000** – sayt, **http://localhost:4000/admin.html** – admin.

---

## Hostga qo‘yish (100% tayyor)

### 1) Netlify (faqat statik, bepul)

- [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project** (GitHub/GitLab yoki **Deploy manually**).
- **Deploy manually** bo‘lsa: papkani **drag & drop** qiling (yoki `netlify deploy`).
- **Build settings**: Leave default yoki `netlify.toml` avtomatik ishlatiladi.
- Natija: `https://your-site.netlify.app`.  
- **Eslatma**: API (`/api/orders`) Netlify statik deployda ishlamaydi. Agar API kerak bo‘lsa, backendni Render/Railway da alohida host qiling.

### 2) Vercel (Node.js – sayt + API bitta loyihada)

- [vercel.com](https://vercel.com) → **Add New** → **Project** → GitHub repo yoki **Import** (papka yuklash).
- Root directory: loyiha papkasi. **Build**: avtomatik. **Deploy**.
- `vercel.json` tufayli `server.js` ishlaydi, sayt va `/api/*` bitta domen ostida.
- Natija: `https://your-project.vercel.app`.

### 3) Render.com (Node.js – sayt + API)

- [render.com](https://render.com) → **New** → **Web Service**.
- Repo ulang yoki **Manual Deploy** (GitHub repo kerak).
- **Build command**: `npm install`  
- **Start command**: `npm start`  
- **Environment**: `NODE_ENV=production` (ixtiyoriy). PORT Render o‘zi beradi.
- Yoki repo ga `render.yaml` qo‘yib, Render **Blueprint** orqali deploy qiling.
- Natija: `https://your-service.onrender.com`.

### 4) GitHub Pages (faqat statik, bepul)

- Reponi GitHub ga yuklang.
- **Settings** → **Pages** → **Source**: Deploy from a branch.
- **Branch**: `main`, folder: **/ (root)**.
- Saqlang: `https://username.github.io/repo-name/`.
- **Eslatma**: Asosiy sahifa `index.html` bo‘lgani uchun root papkada barcha fayl (index, admin, css, js) bo‘lishi kerak. GitHub Pages API qo‘llab-quvvatlamaydi.

### 5) Boshqa host (FTP / cPanel)

- Barcha fayllarni serverga yuklang: `index.html`, `admin.html`, `styles.css`, `not.js`, `admin.js`, `sitemap.xml`, `robots.txt`, `404.html`.
- Domen **document root** shu papkaga yo‘naltirilsin.
- Agar Node.js mavjud bo‘lsa: `package.json`, `server.js` yuklab, `npm install && npm start` va reverse proxy (masalan Nginx) sozlang.

---

## Domenni sozlash

Hostdan domen olganingizdan keyin:

1. **sitemap.xml**: barcha `https://YOUR-DOMAIN.com` o‘rniga o‘z domeningizni yozing.
2. **robots.txt**: `Sitemap: https://YOUR-DOMAIN.com/sitemap.xml` da domenni yangilang.
3. **index.html** va **admin.html** dagi ogohlantirishlar shart emas – ular statik.

---

## Qisqacha

- **Statik host** (Netlify, GitHub Pages): faqat HTML/CSS/JS; menyu va admin **localStorage** da saqlanadi, API yo‘q.
- **Node host** (Vercel, Render): sayt + API bitta domen; `npm start` da hammasi ishlaydi.

Barcha kerakli papka va fayllar loyihada – hostga qo‘yish uchun 100% tayyor.
