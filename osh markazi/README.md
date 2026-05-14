# Osh Markazi - Milliy Restoran Veb-sayti

Ushbu loyiha "Osh Markazi" restorani uchun zamonaviy frontend va Node.js backend qismlarini o'z ichiga oladi.

## Loyiha tarkibi

- **Frontend**: HTML, CSS, JavaScript (Vanilla).
- **Backend**: Node.js, Express.js.
- **Dizayn**: Oltin va oq ranglar, milliy uslub, dark mode.

## Tizimni ishga tushirish tartibi

### 1. Backendni tayyorlash
Backend serverni ishga tushirish uchun quyidagi qadamlarni bajaring:

1. Terminalni (Command Prompt yoki PowerShell) oching.
2. `backend` papkasiga kiring:
   ```bash
   cd backend
   ```
3. Kerakli kutubxonalarni o'rnating:
   ```bash
   npm install
   ```
4. Serverni ishga tushiring:
   ```bash
   npm run dev
   ```
   *Server `http://localhost:5000` manzilida ishga tushadi.*

### 2. Frontendni ishga tushirish
1. Loyihaning asosiy papkasidagi `index.html` faylini istalgan brauzerda (Chrome, Edge, Firefox) oching.
2. Saytdagi formalar (Joy band qilish va Dastavka) avtomatik ravishda ishga tushgan backend serverga ulanadi.

## API Endpointlar

| Vazifasi | Metod | Endpoint |
| :--- | :--- | :--- |
| Barcha buyurtmalar | GET | `http://localhost:5000/api/orders` |
| Barcha band qilishlar | GET | `http://localhost:5000/api/reservations` |
| Yangi buyurtma | POST | `http://localhost:5000/api/orders` |
| Yangi joy band qilish | POST | `http://localhost:5000/api/reservation` |

## Xususiyatlar
- **Dark Mode**: Tepada joylashgan oy/quyosh belgisi orqali rejimni o'zgartirish mumkin.
- **Validation**: Telefon raqami `+998XXXXXXXXX` formatida bo'lishi shart.
- **Responsive**: Sayt telefonlarda ham juda chiroyli ko'rinadi.

---
*Dastur Osh Markazi uchun maxsus tayyorlandi.*
