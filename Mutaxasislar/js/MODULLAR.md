# Mutaxasis ishchilar — Modullar strukturi

## 📁 Modullar

| Modul | Vazifasi |
|-------|----------|
| `config.js` | Viloyatlar, pochtalar, katalog, mahsulotlar, ranglar, brendlar |
| `storage.js` | LocalStorage, cart, favorites, orders, merchantProducts |
| `utils.js` | formatPrice, getProductImages |
| `products.js` | getAllProducts, aksiya sanasi |
| `cart.js` | addToCart, removeFromCart, changeCartQuantity, updateCartUI |
| `favorites.js` | isFavorite, toggleFavorite |
| `orders.js` | getOrders, addOrder |
| `location.js` | openLocationModal, viloyat/tuman |
| `theme.js` | setTheme, initTheme |
| `ui.js` | renderProductCard, renderProductCardSeller, attachProductListeners |
| `main.js` | Xaridor ilovasi (index.html uchun) |
| `seller.js` | Foydalanuvchilar paneli (foydalanuvchilar.html uchun) |

## 🔗 Ishlatish

**Xaridor (asosiy sayt):**
```html
<script type="module" src="js/main.js"></script>
```

**Foydalanuvchilar paneli:**
```html
<script type="module" src="js/seller.js"></script>
```

## 📦 Bog'lanish

```
main.js / seller.js
    ├── config.js
    ├── storage.js
    ├── products.js
    ├── utils.js
    ├── cart.js
    ├── favorites.js
    ├── location.js
    ├── theme.js
    └── ui.js
```
