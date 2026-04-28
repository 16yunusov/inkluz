# Mutaxasis ishchilar — To'liq sayt strukturi va sxemasi

## 📁 Loyiha fayllari

```
New folder/
├── index.html              # Asosiy xaridor sahifasi
├── foydalanuvchilar.html  # Foydalanuvchilar paneli
├── app.js                 # Asosiy ilova logikasi (xaridor)
├── js/seller.js           # Foydalanuvchilar paneli logikasi
├── styles.css             # Barcha stillar
└── SAYT_STRUKTURASI.md    # Ushbu hujjat
```

---

## 🖥️ 1. INDEX.HTML — Asosiy sayt (xaridor)

### Header
| Element | Vazifasi |
|---------|----------|
| Quyosh/Oy | Tema almashish (yorug'/qorong'u) |
| Toshkent | Joylashuv (12 viloyat) |
| yetkazib beriladigan shahar | Ma'lumot matni |
| Foydalanuvchilar paneli | `foydalanuvchilar.html` ga link |
| Qidiruv | Mahsulotlar va turkumlar qidirish |
| Yurak | Yoqtirganlar paneliga o'tish |

### Banners
- **Sariq banner:** Muddatli to'lov 25 mln so'mgacha
- **Binafsha banner:** Ramazonga tayyorlanamiz

### Tezkor kirish (icon grid)
🍔 Taom yetkazib berish | 🌍 Chet eldan tovarlar | ✓ Arzon narxlar | % Foydali fevral | ✨ Go'zallik | 🚗 Avtotovarlar | 6/12 Muddatli to'lov | 🌙 Ramazon | 🧸 Onalar va bolalar

### Asosiy bo'limlar (pastki nav)
| Nav | Bo'lim | Maqsad |
|-----|--------|--------|
| Bosh sahifa | viewHome | Foydali fevral, Keyingi etabdan tavarlar (aksiya) |
| Katalog | viewCatalog | 27+ turkum |
| Yoqtirganlar | viewFavorites | Sevimli mahsulotlar |
| Tezkor | viewTezkor | Bugungi buyurtmalar, qachon kelishi |
| Buyurtmalar | viewBuyurtmalar | Barcha buyurtmalar |
| Profil | viewProfil | Hisob |
| Savat | bottomCartBtn | Savat sidebar |

### Savat va rasmiylashtirish
- Naqt / Nasiya (3, 6, 12, 24 oy)
- Checkout — buyurtmani saqlash

---

## 🛒 2. FOYDALANUVCHILAR.HTML — Foydalanuvchilar paneli

### Header (index bilan bir xil)
- Tema almashish
- Joylashuv
- Qidiruv
- Yurak
- **← Asosiy sayt** — `index.html` ga qaytish

### Pastki nav
| Nav | Bo'lim |
|-----|--------|
| Bosh sahifa | Foydali fevral, Keyingi etabdan tavarlar (aksiya) |
| Katalog | 27+ turkum |
| Savat | Savat sidebar |
| Yoqtirganlar | Sevimlilar |
| Buyurtmalar | Pochtalar bo'yicha buyurtmalar |
| Profil | Foydalanuvchilar hisobi |

### Farqlar (index dan)
- Xuddi index.html bilan bir xil funksionallik (savat, buyurtmalar, yoqtirganlar)

---

## 💾 LocalStorage ma'lumotlar

| Kalit | Ma'lumot |
|-------|----------|
| `uzum_cart` | Savat (mahsulotlar, soni) |
| `uzum_favorites` | Yoqtirilgan mahsulot ID lari |
| `uzum_orders` | Buyurtmalar (id, items, totalPrice, paymentType, nasiyaMonths, date, deliveryPoint, deliveryDate) |
| `uzum_merchant_products` | Savdogar qo'shgan mahsulotlar |
| `uzum_region` | Tanlangan viloyat |
| `uzum_theme` | light / dark |

---

## 📊 Ma'lumot oqimi

```
┌─────────────────┐     ┌──────────────────────┐
│   index.html    │     │ foydalanuvchilar.html │
│   (main.js)     │◄───►│  (seller.js)         │
└────────┬────────┘     └────────┬─────────────┘
         │                       │
         └───────────┬───────────┘
                     │
              ┌──────▼──────┐
              │ localStorage │
              │  uzum_*     │
              └─────────────┘
```

---

## 🗂️ Katalog turkumlari (27 ta)

| ID | Nomi |
|----|------|
| xorijdan | Xorijdan tovarlar |
| hafta | Hafta tovarlari |
| bahor | Bahorgi kolleksiya |
| gozallik | Sizning go'zalligingiz |
| smartfon | Smartfonlar |
| elektronika | Elektronika |
| maishiy | Maishiy texnika |
| kiyim | Kiyim |
| poyabzal | Poyabzallar |
| aksessuar | Aksessuarlar |
| uy | Uy-ro'zg'or buyumlari |
| bolalar | Bolalar tovarlari |
| oziq | Oziq-ovqat |
| ... | va boshqalar |

---

## 🔗 Sahifalar orasidagi bog'lanish

```
index.html  ──[Foydalanuvchilar paneli]──►  foydalanuvchilar.html
foydalanuvchilar.html ──[← Asosiy sayt]──►  index.html
```

---

## 📱 Responsive

- Mobil: 145px mahsulot karta
- Planshet: 185px
- Desktop: 168px / 185px
