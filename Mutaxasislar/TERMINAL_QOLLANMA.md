# Mutaxasis ishchilar — Terminal orqali ishga tushirish

## 1-qadam: Loyiha papkasiga o'tish

```bash
cd C:\Users\User\Desktop\market
```

yoki loyiha joylashgan papkaga:

```bash
cd sizning\papka\yo'li\market
```

---

## 2-qadam: O'rnatish (birinchi marta)

```bash
npm install
```

```bash
cd backend
npm install
cd ..
```

---

## 3-qadam: Server ishga tushirish

```bash
npm start
```

**Natija:** Terminalda quyidagicha linklar chiqadi:

```
══════════════════════════════════════════════════
  Mutaxasis ishchilar — Server ishga tushdi!
══════════════════════════════════════════════════

  Asosiy sayt:     http://localhost:3001
  Foydalanuvchilar: http://localhost:3001/foydalanuvchilar.html
  API tekshiruv:   http://localhost:3001/api/health

  Brauzerda ochish uchun yuqoridagi linklarni bosing
  yoki brauzerda http://localhost:3001 manzilini kiriting.

  To'xtatish: Ctrl+C
══════════════════════════════════════════════════
```

---

## Foydali buyruqlar

| Buyruq | Vazifasi |
|--------|----------|
| `npm start` | Server ishga tushirish |
| `npm run copy` | Frontend fayllarni nusxalash |
| `Ctrl+C` | Serverni to'xtatish |

---

## Port o'zgartirish

```bash
set PORT=8080
npm start
```

yoki PowerShell da:

```powershell
$env:PORT=8080; npm start
```

---

## start.bat orqali (Windows)

`start.bat` faylini ikki marta bosib ishga tushiring — u avtomatik o'rnatadi va serverni ishga tushiradi.
