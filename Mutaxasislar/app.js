// Mutaxasis ishchilar — Asosiy ilova (xaridor)

const regions = [
    'Toshkent', 'Andijon', 'Buxoro', "Farg'ona", 'Jizzax', 'Xorazm',
    'Namangan', 'Navoiy', "Qashqadaryo", 'Samarqand', 'Sirdaryo', "Surxondaryo"
];

const jamiykiyPochtalar = [
    { id: 'chirchiq-markaz', regionId: 'toshkent', districtKey: "Chirchiq shahar", regionName: "Toshkent", district: "Chirchiq shahar", name: "Markaziy pochta" },
    { id: 'olmalik-bozor', regionId: 'toshkent', districtKey: "Olmaliq shahar", regionName: "Toshkent", district: "Olmaliq shahar", name: "Bozor yonidagi pochta" },
    { id: 'yangiyol-vokzal', regionId: 'toshkent', districtKey: "Yangiyo'l", regionName: "Toshkent", district: "Yangiyo'l", name: "Vokzal oldidagi pochta" },
    { id: 'zangiota-markaz', regionId: 'toshkent', districtKey: "Zangiota", regionName: "Toshkent", district: "Zangiota", name: "Markaziy jamiykiy pochta" },
    { id: 'toshkent-chilonzor', regionId: 'toshkent', districtKey: "Chilonzor", regionName: "Toshkent", district: "Chilonzor", name: "5-mavze pochta" },
    { id: 'toshkent-yunusobod', regionId: 'toshkent', districtKey: "Yunusobod", regionName: "Toshkent", district: "Yunusobod", name: "15-mavze pochta" },
    { id: 'bektemir-pochta', regionId: 'toshkent', districtKey: "Bektemir", regionName: "Toshkent", district: "Bektemir", name: "Markaziy pochta" },
    { id: 'bekobod-pochta', regionId: 'toshkent', districtKey: "Bekobod", regionName: "Toshkent", district: "Bekobod", name: "Vokzal pochta" },
    { id: 'andijon-markaz', regionId: 'andijon', districtKey: "Andijon shahar", regionName: "Andijon", district: "Andijon shahar", name: "Markaziy pochta" },
    { id: 'andijon-asaka', regionId: 'andijon', districtKey: "Asaka", regionName: "Andijon", district: "Asaka", name: "Avtobus bekati pochta" },
    { id: 'andijon-marhamat', regionId: 'andijon', districtKey: "Marhamat", regionName: "Andijon", district: "Marhamat", name: "Bozor yonidagi pochta" },
    { id: 'buxoro-markaz', regionId: 'buxoro', districtKey: "Buxoro shahar", regionName: "Buxoro", district: "Buxoro shahar", name: "Ark oldidagi pochta" },
    { id: 'buxoro-shofirkon', regionId: 'buxoro', districtKey: "Shofirkon", regionName: "Buxoro", district: "Shofirkon", name: "Toshkent styanka oldidagi pochta" },
    { id: 'buxoro-shofirkon2', regionId: 'buxoro', districtKey: "Shofirkon", regionName: "Buxoro", district: "Shofirkon", name: "Bozor pochta" },
    { id: 'buxoro-kojikent', regionId: 'buxoro', districtKey: "Kogon", regionName: "Buxoro", district: "Kogon", name: "Ko'jikent pochta" },
    { id: 'buxoro-vobkent', regionId: 'buxoro', districtKey: "Vobkent", regionName: "Buxoro", district: "Vobkent", name: "Markaziy pochta" },
    { id: 'buxoro-gijduvon', regionId: 'buxoro', districtKey: "G'ijduvon", regionName: "Buxoro", district: "G'ijduvon", name: "Bozor pochta" },
    { id: 'fargona-markaz', regionId: 'fargona', districtKey: "Farg'ona shahar", regionName: "Farg'ona", district: "Farg'ona shahar", name: "Markaziy pochta" },
    { id: 'fargona-quva', regionId: 'fargona', districtKey: "Quva", regionName: "Farg'ona", district: "Quva", name: "Bozor pochta" },
    { id: 'fargona-margilon', regionId: 'fargona', districtKey: "Marg'ilon shahar", regionName: "Farg'ona", district: "Marg'ilon shahar", name: "Korxona yonidagi pochta" },
    { id: 'jizzax-markaz', regionId: 'jizzax', districtKey: "Jizzax shahar", regionName: "Jizzax", district: "Jizzax shahar", name: "Markaziy pochta" },
    { id: 'jizzax-forish', regionId: 'jizzax', districtKey: "Forish", regionName: "Jizzax", district: "Forish", name: "Vokzal pochta" },
    { id: 'xorazm-urganch', regionId: 'xorazm', districtKey: "Urganch shahar", regionName: "Xorazm", district: "Urganch shahar", name: "Markaziy pochta" },
    { id: 'xorazm-xiva', regionId: 'xorazm', districtKey: "Xiva shahar", regionName: "Xorazm", district: "Xiva shahar", name: "Ichan qal'a yonidagi pochta" },
    { id: 'namangan-markaz', regionId: 'namangan', districtKey: "Namangan shahar", regionName: "Namangan", district: "Namangan shahar", name: "Markaziy pochta" },
    { id: 'namangan-chust', regionId: 'namangan', districtKey: "Chust", regionName: "Namangan", district: "Chust", name: "Bozor pochta" },
    { id: 'navoiy-markaz', regionId: 'navoiy', districtKey: "Navoiy shahar", regionName: "Navoiy", district: "Navoiy shahar", name: "Markaziy pochta" },
    { id: 'navoiy-zarafshon', regionId: 'navoiy', districtKey: "Zarafshon shahar", regionName: "Navoiy", district: "Zarafshon shahar", name: "Kon kombinat pochta" },
    { id: 'qashqadaryo-qarshi', regionId: 'qashqadaryo', districtKey: "Qarshi shahar", regionName: "Qashqadaryo", district: "Qarshi shahar", name: "Markaziy pochta" },
    { id: 'qashqadaryo-shahrisabz', regionId: 'qashqadaryo', districtKey: "Shahrisabz", regionName: "Qashqadaryo", district: "Shahrisabz", name: "Amir Temur maydoni pochta" },
    { id: 'samarqand-markaz', regionId: 'samarqand', districtKey: "Samarqand shahar", regionName: "Samarqand", district: "Samarqand shahar", name: "Registon yonidagi pochta" },
    { id: 'samarqand-urgut', regionId: 'samarqand', districtKey: "Urgut", regionName: "Samarqand", district: "Urgut", name: "Bozor pochta" },
    { id: 'sirdaryo-guliston', regionId: 'sirdaryo', districtKey: "Guliston shahar", regionName: "Sirdaryo", district: "Guliston shahar", name: "Markaziy pochta" },
    { id: 'sirdaryo-sirdaryo', regionId: 'sirdaryo', districtKey: "Sirdaryo tuman", regionName: "Sirdaryo", district: "Sirdaryo tuman", name: "Vokzal pochta" },
    { id: 'surxondaryo-termiz', regionId: 'surxondaryo', districtKey: "Termiz shahar", regionName: "Surxondaryo", district: "Termiz shahar", name: "Markaziy pochta" },
    { id: 'surxondaryo-denisov', regionId: 'surxondaryo', districtKey: "Denov", regionName: "Surxondaryo", district: "Denov", name: "Bozor pochta" }
];

const regionToId = { 'Toshkent':'toshkent','Andijon':'andijon','Buxoro':'buxoro',"Farg'ona":'fargona','Jizzax':'jizzax','Xorazm':'xorazm','Namangan':'namangan','Navoiy':'navoiy',"Qashqadaryo":'qashqadaryo','Samarqand':'samarqand','Sirdaryo':'sirdaryo','Surxondaryo':'surxondaryo' };

const viloyatTumanlari = {
    toshkent: ['Bekobod','Bo\'ka','Bo\'stonliq','Zangiota','Oqqo\'rg\'on','Ohangaron','Parkent','Piskent','Chinoz','Yuqori Chirchiq','Yangiyo\'l','O\'rta Chirchiq','Qibray','Quyichirchiq','Toshkent tuman','Chirchiq shahar','Olmaliq shahar','Angren shahar','Bektemir','Chilonzor','Hamza','Mirobod','Mirzo Ulug\'bek','Sergeli','Shayxontohur','Sobir Rahimov','Uchtepa','Yakkasaroy','Yashnobod','Yunusobod'],
    andijon: ['Andijon shahar','Andijon tuman','Asaka','Baliqchi','Bo\'zsuv','Buloqboshi','Izboskan','Jalolquduq','Marhamat','Oltinko\'l','Paxtaobod','Qo\'rg\'ontepa','Shahrixon','Ulug\'nor','Xo\'jaobod'],
    buxoro: ['Buxoro shahar','Buxoro tuman','Vobkent','Jondor','Kogon','Olot','Peshku','Romitan','Shofirkon','Qorovulbozor','Qorako\'l','G\'ijduvon'],
    fargona: ["Farg'ona shahar","Farg'ona tuman",'Beshariq','Bog\'dod','Buvayda','Dang\'ara','Furqat','Oltiariq','Oxunboboev','O\'zbekiston','Quva','Rishton','So\'x','Toshloq','Uchko\'prik','Yozyovon',"Marg'ilon shahar","Qo'qon shahar","Quvasoy shahar"],
    jizzax: ['Jizzax shahar','Jizzax tuman','Arnasoy','Baxmal','Do\'stlik','Forish','G\'allaorol','Mirzacho\'l','Paxtakor','Yangiobod'],
    xorazm: ['Urganch shahar','Urganch tuman','Bog\'ot','Gurlan','Hazorasp','Qo\'shko\'pir','Shovot','Xiva shahar','Xiva tuman','Xonqa','Yangiariq','Yangibozor'],
    namangan: ['Namangan shahar','Namangan tuman','Chortoq','Chust','Kosonsoy','Mingbuloq','Norin','Pop','To\'raqo\'rg\'on','Uchqo\'rg\'on','Uychi','Yangiqo\'rg\'on'],
    navoiy: ['Navoiy shahar','Navoiy tuman','Konimex','Navbahor','Nurota','Qiziltepa','Tomdi','Uchquduq','Xatirchi','Karmana','Zarafshon shahar'],
    qashqadaryo: ['Qarshi shahar','Qarshi tuman','Bahoriston','Dehqonobod','G\'uzor','Kasbi','Kitob','Koson','Muborak','Nishon','Qamashi','Shahrisabz','Usmon Yusupov','Yakkabog\'','Chiroqchi'],
    samarqand: ['Samarqand shahar','Samarqand tuman','Bulung\'ur','Ishtixon','Jomboy','Kattaqo\'rg\'on','Narpay','Nurobod','Oqdaryo','Pastdarg\'om','Paxtachi','Payariq','Qo\'shrabot','Toyloq','Urgut'],
    sirdaryo: ['Guliston shahar','Guliston tuman','Boyovut','Mehnatobod','Mirzaobod','Oqoltin','Sayxunobod','Sharof Rashidov','Sirdaryo tuman','Xovos','Baxt shahar','Shirin shahar','Yangiyer shahar'],
    surxondaryo: ['Termiz shahar','Termiz tuman','Angor','Bandixon','Boysun','Denov','Jarqo\'rg\'on','Muzrabot','Oltinsoy','Qiziriq','Qumqo\'rg\'on','Sariosiyo','Sherobod','Sho\'rchi','Uzun']
};

const catalogCategories = [
    { id: 'xorijdan', name: 'Xorijdan tovarlar', sub: 'Mutaxasis ishchilar', icon: '🌍', color: '#7c3aed' },
    { id: 'hafta', name: 'Hafta tovarlari', sub: '', icon: '🔥', color: '#f97316' },
    { id: 'bahor', name: 'Bahorgi kolleksiya', sub: '', icon: '👕', color: '#22c55e' },
    { id: 'gozallik', name: "Sizning go'zalligingiz", sub: '', icon: '✨', color: '#ec4899' },
    { id: 'smartfon', name: 'Smartfonlar', sub: '', icon: '📱', color: '#eab308' },
    { id: 'elektronika', name: 'Elektronika', sub: '', icon: '🎧', color: '#64748b' },
    { id: 'maishiy', name: 'Maishiy texnika', sub: '', icon: '🔌', color: '#7c3aed' },
    { id: 'kiyim', name: 'Kiyim', sub: '', icon: '👕', color: '#3b82f6' },
    { id: 'poyabzal', name: 'Poyabzallar', sub: '', icon: '👟', color: '#ef4444' },
    { id: 'aksessuar', name: 'Aksessuarlar', sub: '', icon: '👜', color: '#f97316' },
    { id: 'uy', name: "Uy-ro'zg'or buyumlari", sub: '', icon: '🏠', color: '#f97316' },
    { id: 'bolalar', name: 'Bolalar tovarlari', sub: '', icon: '🐴', color: '#7c3aed' },
    { id: 'oziq', name: "Oziq-ovqat mahsulotlari", sub: '', icon: '🍎', color: '#22c55e' },
    { id: 'parvarish', name: "Go'zallik va parvarish", sub: '', icon: '💄', color: '#ec4899' },
    { id: 'kitob', name: 'Kitoblar', sub: '', icon: '📚', color: '#f97316' }
];

const categorySubcategories = {
    gozallik: [
        { id: 'parvarish', name: "Go'zallik va parvarish" },
        { id: 'makiyaj', name: 'Makiyaj' },
        { id: 'yuz', name: 'Yuz parvarishi' },
        { id: 'koz', name: "Ko'zlar" }
    ],
    maishiy: [
        { id: 'muzlatgich', name: 'Muzlatgichlar' },
        { id: 'tv', name: 'TV va video' },
        { id: 'tozalash', name: 'Tozalash' }
    ],
    kiyim: [
        { id: 'erkaklar', name: 'Erkaklar' },
        { id: 'ayollar', name: 'Ayollar' }
    ],
    smartfon: [
        { id: 'apple', name: 'Apple' },
        { id: 'samsung', name: 'Samsung' },
        { id: 'xiaomi', name: 'Xiaomi' }
    ],
    elektronika: [
        { id: 'noutbuk', name: 'Noutbuklar' },
        { id: 'planshet', name: 'Planshetlar' }
    ],
    uy: [
        { id: 'idish', name: 'Idish-tovoq' },
        { id: 'dekor', name: 'Dekoratsiya' }
    ],
    poyabzal: [
        { id: 'erkaklar', name: 'Erkaklar uchun' },
        { id: 'ayollar', name: 'Ayollar uchun' },
        { id: 'sport', name: 'Sport' }
    ],
    aksessuar: [
        { id: 'sumka', name: 'Sumkalar' },
        { id: 'soat', name: 'Soatlar' }
    ]
};

const colors = ['Qora', 'Oq', 'Kulrang', 'Qizil', 'Ko\'k', 'Yashil', 'Sariq', 'Pushti'];

const categoryBrands = {
    smartfon: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo'],
    elektronika: ['Samsung', 'Apple', 'Xiaomi', 'LG', 'Sony'],
    maishiy: ['Samsung', 'LG', 'Artel', 'Beko'],
    kiyim: ['Nike', 'Adidas', 'Zara', 'H&M'],
    poyabzal: ['Nike', 'Adidas', 'Puma'],
    gozallik: ['L\'Oreal', 'NIVEA', 'Maybelline'],
    default: ['Boshqa']
};

const countries = ['O\'zbekiston', 'Xitoy', 'Janubiy Koreya', 'Yaponiya', 'AQSh', 'Germaniya', 'Turkiya', 'Rossiya'];

const products = [
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 13999000, oldPrice: 15499000, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", categoryId: 'smartfon', subcategoryId: 'samsung', rating: 4.8, reviews: 1892, brand: 'Samsung', color: 'Qora', madeIn: 'Janubiy Koreya' },
    { id: 3, name: "MacBook Pro 14\" M3", price: 24999000, oldPrice: 26999000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", categoryId: 'elektronika', brand: 'Apple', color: 'Kulrang', madeIn: 'AQSh' },
    { id: 4, name: "AirPods Pro 2", price: 2999000, oldPrice: 3299000, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400", categoryId: 'aksessuar', brand: 'Apple', color: 'Oq', madeIn: 'Xitoy' },
    { id: 5, name: "Samsung Smart TV 55\" 4K", price: 7999000, oldPrice: 8999000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400", categoryId: 'maishiy', subcategoryId: 'tv', rating: 4.7, reviews: 562, brand: 'Samsung', color: 'Qora', madeIn: 'Janubiy Koreya' },
    { id: 6, name: "Dyson V15 vacuum", price: 5999000, oldPrice: 6999000, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400", categoryId: 'maishiy', subcategoryId: 'tozalash', rating: 4.9, brand: 'Boshqa', color: 'Kulrang', madeIn: 'Xitoy' },
    { id: 7, name: "Nike Air Max 90", price: 1299000, oldPrice: 1499000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", categoryId: 'poyabzal', subcategoryId: 'sport', rating: 4.8, brand: 'Nike', color: 'Oq', madeIn: 'Xitoy' },
    { id: 8, name: "Adidas Sport T-shirt", price: 299000, oldPrice: 399000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", categoryId: 'kiyim', subcategoryId: 'erkaklar', brand: 'Adidas', color: 'Qora', madeIn: 'Xitoy' },
    { id: 9, name: "Redmi Note 14 8GB 256GB", price: 1899050, oldPrice: 2199050, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400", categoryId: 'smartfon', brand: 'Xiaomi', color: 'Kulrang', madeIn: 'Xitoy' },
    { id: 10, name: "Smart Ring", price: 113985, oldPrice: 149000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", categoryId: 'aksessuar', brand: 'Boshqa', color: 'Kulrang', madeIn: 'Xitoy' },
    { id: 11, name: "Idish to'plami 6 dona", price: 551384, oldPrice: 649000, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400", categoryId: 'uy', brand: 'Boshqa', color: 'Oq', madeIn: 'O\'zbekiston' },
    { id: 12, name: "NIVEA Lablar uchun balzam", price: 26991, oldPrice: 29990, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", categoryId: 'gozallik', subcategoryId: 'parvarish', rating: 4.9, brand: 'NIVEA', color: 'Pushti', madeIn: 'Germaniya' },
    { id: 13, name: "3D effektli ulama kipriklar", price: 25191, oldPrice: 27990, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400", categoryId: 'gozallik', subcategoryId: 'makiyaj', brand: 'Maybelline', color: 'Qora', madeIn: 'Xitoy' },
    { id: 14, name: "L'Oreal yuz kremi 50ml", price: 89900, oldPrice: 99900, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", categoryId: 'gozallik', subcategoryId: 'yuz', rating: 4.8, brand: 'L\'Oreal', color: 'Oq', madeIn: 'Fransiya' }
];

let cart = JSON.parse(localStorage.getItem('uzum_cart')) || [];
let merchantProducts = JSON.parse(localStorage.getItem('uzum_merchant_products')) || [];
let favorites = JSON.parse(localStorage.getItem('uzum_favorites')) || [];
let orders = JSON.parse(localStorage.getItem('uzum_orders')) || [];

function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
}

function getProductImages(product) {
    if (product.images && Array.isArray(product.images) && product.images.length) {
        return product.images.filter(u => u && u.trim());
    }
    return product.image ? [product.image] : [];
}

function getAllProducts() {
    return [...products, ...merchantProducts];
}

function isFavorite(productId) {
    return favorites.some(f => f == productId);
}

function toggleFavorite(productId) {
    const id = parseInt(productId) || productId;
    const idx = favorites.findIndex(f => f == id);
    if (idx >= 0) favorites.splice(idx, 1);
    else favorites.push(id);
    localStorage.setItem('uzum_favorites', JSON.stringify(favorites));
    if (typeof renderFavorites === 'function') renderFavorites();
    if (viewCatalog && viewCatalog.style.display !== 'none' && typeof renderCatalog === 'function') renderCatalog();
}

function saveCart() {
    localStorage.setItem('uzum_cart', JSON.stringify(cart));
}

function saveOrders() {
    localStorage.setItem('uzum_orders', JSON.stringify(orders));
}

function generateOrderId() {
    const key = 'uzum_order_id_counter';
    let counter = parseInt(localStorage.getItem(key), 10) || 0;
    counter += 1;
    localStorage.setItem(key, String(counter));
    return 'ORD-' + counter;
}

function generateOrderItemId() {
    const key = 'uzum_order_item_id_counter';
    let counter = parseInt(localStorage.getItem(key), 10) || 0;
    counter += 1;
    localStorage.setItem(key, String(counter));
    return 'ITM-' + counter;
}

// DOM
const productsGrid = document.getElementById('productsGrid');
const aksiyaGrid = document.getElementById('aksiyaGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const searchInput = document.getElementById('searchInput');
const bottomCartBtn = document.getElementById('bottomCartBtn');
const bottomCartCount = document.getElementById('bottomCartCount');
const bottomFavCount = document.getElementById('bottomFavCount');

const viewHome = document.getElementById('viewHome');
const viewCatalog = document.getElementById('viewCatalog');
const viewCategory = document.getElementById('viewCategory');
const viewFavorites = document.getElementById('viewFavorites');
const viewTezkor = document.getElementById('viewTezkor');
const viewBuyurtmalar = document.getElementById('viewBuyurtmalar');
const viewProfil = document.getElementById('viewProfil');

let currentCategoryId = null;
let currentSubcategoryId = 'all';
let filterRang = '', filterBrend = '', filterNarx = '', filterIshlab = '';

function filteredProducts() {
    const query = (searchInput && searchInput.value || '').toLowerCase().trim();
    const all = getAllProducts();
    if (!query) return all;
    return all.filter(p => {
        const cat = catalogCategories.find(c => c.id === p.categoryId);
        const searchIn = [p.name, p.description || '', p.merchantName || '', cat ? cat.name : ''].join(' ').toLowerCase();
        return searchIn.includes(query);
    });
}

function addToCart(productId, priceOverride) {
    const product = getAllProducts().find(p => p.id == productId);
    if (!product) return;
    const existing = cart.find(item => item.id == productId);
    const price = priceOverride != null ? priceOverride : product.price;
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, price, quantity: 1 });
    saveCart();
    updateCartUI();
    if (productsGrid) renderProducts(filteredProducts());
    if (aksiyaGrid) renderAksiyaProducts();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    saveCart();
    updateCartUI();
    if (productsGrid) renderProducts(filteredProducts());
    if (aksiyaGrid) renderAksiyaProducts();
}

function changeCartQuantity(productId, delta) {
    const item = cart.find(i => i.id == productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) { removeFromCart(productId); return; }
    item.quantity = newQty;
    saveCart();
    updateCartUI();
}

function updateCartPochtaSelect() {
    const sel = document.getElementById('cartPochtaSelect');
    if (!sel) return;
    const region = localStorage.getItem('uzum_region') || 'Toshkent';
    const tuman = localStorage.getItem('uzum_tuman') || '';
    const rid = regionToId[region] || 'toshkent';
    let pochtalar = jamiykiyPochtalar.filter(p => p.regionId === rid);
    if (tuman) pochtalar = pochtalar.filter(p => p.districtKey === tuman);
    if (pochtalar.length === 0 && tuman) {
        const regionName = region || Object.entries(regionToId).find(([, v]) => v === rid)?.[0] || 'Toshkent';
        pochtalar = [{ id: 'gen-' + rid + '-' + tuman.replace(/\s/g, '-'), regionId: rid, regionName, district: tuman, name: 'Markaziy pochta', districtKey: tuman }];
    }
    sel.innerHTML = '<option value="">Pochtani tanlang</option>' +
        pochtalar.map(p => `<option value="${p.id}" data-name="${p.district}, ${p.name}">${p.district}, ${p.name}</option>`).join('');
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (bottomCartCount) {
        bottomCartCount.textContent = totalItems;
        bottomCartCount.style.display = totalItems ? 'flex' : 'none';
    }

    if (!cartItems) return;

    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'none';
        cartItems.innerHTML = '<p class="cart-empty">Savat bo\'sh</p>';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'block';
        if (cartTotal) cartTotal.textContent = formatPrice(totalPrice);
        updateCartPochtaSelect();

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image || ''}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-qty">
                        <button class="cart-qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                        <span class="cart-qty-num">${item.quantity}</span>
                        <button class="cart-qty-btn" data-id="${item.id}" data-delta="1">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">✕</button>
            </div>
        `).join('');

        cartItems.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', () => changeCartQuantity(parseInt(btn.dataset.id), parseInt(btn.dataset.delta)));
        });
        cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
        });
    }
}

function updateFavoritesCount() {
    if (bottomFavCount) {
        bottomFavCount.textContent = favorites.length;
        bottomFavCount.style.display = favorites.length ? 'flex' : 'none';
    }
}

function renderProductCard(product, inAksiya) {
    const inCart = cart.some(item => item.id == product.id);
    const cat = catalogCategories.find(c => c.id === product.categoryId);
    const accentColor = cat ? cat.color : '#7c3aed';
    const images = getProductImages(product);
    const imgUrl = images[0] || '';
    const hasMultiImg = images.length > 1;
    const installment = product.price >= 10000 ? Math.round(product.price / 12) : null;

    const imgHtml = hasMultiImg ? `
        <div class="product-img-gallery">
            <img src="${imgUrl}" alt="${product.name}" class="product-image product-gallery-img">
            <div class="product-img-dots">${images.map((_, i) => `<span class="img-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join('')}</div>
        </div>
    ` : `<img src="${imgUrl}" alt="${product.name}" class="product-image">`;

    const addBtn = inAksiya
        ? `<button class="add-ertaga" data-id="${product.id}" ${inCart ? 'disabled' : ''}>${inCart ? "Savatda" : "Ertaga"}</button>`
        : `<button class="add-to-cart" data-id="${product.id}" ${inCart ? 'disabled' : ''}>${inCart ? "Savatda" : "Savatga"}</button>`;

    return `
        <div class="product-card product-card-enhanced" style="--accent-color:${accentColor}" data-product-images='${JSON.stringify(images)}'>
            <div class="product-image-wrap">
                ${imgHtml}
                <button class="product-fav ${isFavorite(product.id) ? 'active' : ''}" data-id="${product.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
            <div class="product-info product-info-enhanced">
                <h3 class="product-name">${product.name}</h3>
                ${product.oldPrice ? `<span class="product-price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                <span class="product-price">${formatPrice(product.price)}</span>
                ${installment ? `<div class="product-installment">${formatPrice(installment)}/oyiga</div>` : ''}
                ${addBtn}
            </div>
        </div>
    `;
}

function attachProductListeners(container) {
    if (!container) return;
    container.querySelectorAll('.add-to-cart, .add-ertaga').forEach(btn => {
        btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
    });
    container.querySelectorAll('.img-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const gallery = dot.closest('.product-img-gallery');
            const card = dot.closest('.product-card');
            if (!gallery || !card) return;
            const images = JSON.parse(card.dataset.productImages || '[]');
            const idx = parseInt(dot.dataset.idx);
            if (images[idx]) {
                gallery.querySelector('.product-gallery-img').src = images[idx];
                gallery.querySelectorAll('.img-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            }
        });
    });
}

function renderProducts(productsToRender) {
    if (!productsGrid) return;
    const toShow = (productsToRender || getAllProducts()).filter(p => !isFavorite(p.id));
    productsGrid.innerHTML = toShow.map(p => renderProductCard(p, false)).join('');
    attachProductListeners(productsGrid);
}

const AKSIYA_STORAGE_KEY = 'uzum_aksiya_end_date';

function getAksiyaEndDate() {
    return localStorage.getItem(AKSIYA_STORAGE_KEY) || '';
}

function setAksiyaEndDate(dateStr) {
    if (dateStr) localStorage.setItem(AKSIYA_STORAGE_KEY, dateStr);
    else localStorage.removeItem(AKSIYA_STORAGE_KEY);
}

function isAksiyaExpired() {
    const endStr = getAksiyaEndDate();
    if (!endStr) return false;
    const end = new Date(endStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return today > end;
}

function getAksiyaDaysLeft() {
    const endStr = getAksiyaEndDate();
    if (!endStr) return null;
    const end = new Date(endStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff;
}

function initAksiyaDateSelects() {
    const dayEl = document.getElementById('aksiyaDay');
    const monthEl = document.getElementById('aksiyaMonth');
    const yearEl = document.getElementById('aksiyaYear');
    if (!yearEl) return;
    if (yearEl.options.length <= 1) {
        const y = new Date().getFullYear();
        for (let i = y; i <= y + 5; i++) yearEl.add(new Option(i, i));
    }
    const saved = getAksiyaEndDate();
    if (saved) {
        const [y, m, d] = saved.split('-').map(Number);
        if (dayEl) dayEl.value = d || '';
        if (monthEl) monthEl.value = m || '';
        if (yearEl) yearEl.value = y || '';
    } else {
        if (dayEl) dayEl.value = '';
        if (monthEl) monthEl.value = '';
        if (yearEl) yearEl.value = '';
    }
}

function syncAksiyaDateFromSelects() {
    const d = document.getElementById('aksiyaDay')?.value;
    const m = document.getElementById('aksiyaMonth')?.value;
    const y = document.getElementById('aksiyaYear')?.value;
    if (d && m && y) {
        const dateStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        setAksiyaEndDate(dateStr);
    } else setAksiyaEndDate('');
}

function renderAksiyaProducts() {
    const aksiyaSection = document.getElementById('aksiyaSection');
    const aksiyaTimer = document.getElementById('aksiyaTimer');
    if (!aksiyaGrid || !aksiyaSection) return;
    initAksiyaDateSelects();
    if (isAksiyaExpired()) {
        aksiyaSection.style.display = 'none';
        return;
    }
    aksiyaSection.style.display = 'block';
    const daysLeft = getAksiyaDaysLeft();
    if (aksiyaTimer) {
        if (daysLeft !== null) {
            if (daysLeft < 0) aksiyaTimer.textContent = '';
            else if (daysLeft === 0) aksiyaTimer.textContent = '⏱ Bugun tugaydi';
            else aksiyaTimer.textContent = `⏱ ${daysLeft} kun qoldi`;
        } else aksiyaTimer.textContent = '';
    }
    const aksiya = getAllProducts().filter(p => p.oldPrice && p.oldPrice > p.price);
    aksiyaGrid.innerHTML = aksiya.map(p => renderProductCard(p, true)).join('');
    attachProductListeners(aksiyaGrid);
}

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const emptyEl = document.getElementById('favoritesEmpty');
    if (!grid) return;
    const favProducts = getAllProducts().filter(p => favorites.some(f => f == p.id));
    updateFavoritesCount();
    if (emptyEl) emptyEl.style.display = favProducts.length ? 'none' : 'block';
    grid.innerHTML = favProducts.map(p => renderProductCard(p, false)).join('');
    grid.style.display = favProducts.length ? 'grid' : 'none';
    attachProductListeners(grid);
}

function getTodayOrders() {
    const today = new Date().toDateString();
    return orders.filter(o => new Date(o.date).toDateString() === today);
}

function renderTezkor() {
    const list = document.getElementById('tezkorOrdersList');
    const emptyEl = document.getElementById('tezkorEmpty');
    const statsEl = document.getElementById('tezkorStats');
    if (!list) return;
    const todayOrders = []; // Buyurtmalar faqat Buyurtmalar bo'limida ko'rsatiladi
    const totalItems = todayOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
    if (statsEl) statsEl.textContent = `Bugun ${totalItems} ta buyurtma`;
    if (todayOrders.length === 0) {
        list.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    list.innerHTML = todayOrders.map((order, i) => {
        const itemsHtml = order.items.map(item => `
            <div class="order-item">
                <img src="${item.image || ''}" alt="${item.name}" class="order-item-img">
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}${item.itemId ? ` <span class="order-item-id">#${item.itemId}</span>` : ''}</div>
                    <div class="order-item-meta">${formatPrice(item.price)} × ${item.quantity}</div>
                </div>
            </div>
        `).join('');
        const locInfo = [order.viloyat, order.tuman, order.pochtaJoyi || (order.deliveryPoint || '').replace(/Jamiykiy\s*/g, '')].filter(Boolean).join(', ');
        const deliveryMsg = (order.deliveryPoint || locInfo) ? `
            <div class="tezkor-delivery-msg">
                ✓ Sizga <strong>${order.deliveryPoint || locInfo}</strong> ga yetib keladi
                ${order.deliveryDate ? `<br>⏱ ${order.deliveryDate}` : ''}
            </div>
        ` : '';
        return `
            <div class="order-card">
                <div class="order-card-header">
                    <span class="order-num">${order.orderId || (i + 1)}</span>
                    <span class="order-date">${order.date}</span>
                </div>
                <div class="order-card-body">${itemsHtml}</div>
                ${deliveryMsg}
                <div class="order-card-footer"><strong>${formatPrice(order.totalPrice)}</strong></div>
            </div>
        `;
    }).join('');
}

let selectedPochtaId = null;

function renderOrders() {
    const pochtaListWrap = document.getElementById('pochtaListWrap');
    const pochtaRegionList = document.getElementById('pochtaRegionList');
    const pochtaOrdersWrap = document.getElementById('pochtaOrdersWrap');
    const ordersEmpty = document.getElementById('ordersEmpty');
    if (!pochtaRegionList) return;
    orders = JSON.parse(localStorage.getItem('uzum_orders')) || [];
    const ordersWithPochta = orders.filter(o => o.pochtaId || o.deliveryPoint);
    if (ordersWithPochta.length === 0) {
        pochtaListWrap.style.display = 'none';
        pochtaOrdersWrap.style.display = 'none';
        if (ordersEmpty) ordersEmpty.style.display = 'block';
        return;
    }
    if (ordersEmpty) ordersEmpty.style.display = 'none';
    if (selectedPochtaId) {
        pochtaListWrap.style.display = 'none';
        pochtaOrdersWrap.style.display = 'block';
        renderOrdersByPochta(selectedPochtaId);
        return;
    }
    pochtaListWrap.style.display = 'block';
    pochtaOrdersWrap.style.display = 'none';
    const pochtaCounts = {};
    ordersWithPochta.forEach(o => {
        const pid = o.pochtaId || (o.deliveryPoint ? 'custom-' + o.deliveryPoint.replace(/\s+/g, '-').replace(/[^\w-]/g, '') : null);
        if (pid) pochtaCounts[pid] = (pochtaCounts[pid] || 0) + 1;
    });
    const byRegion = {};
    Object.keys(pochtaCounts).forEach(pid => {
        const p = jamiykiyPochtalar.find(x => x.id === pid);
        const ord = ordersWithPochta.find(o => (o.pochtaId || '') === pid);
        const regionName = p ? p.regionName : (ord?.viloyat || 'Boshqa');
        const displayName = p ? `${p.district}, ${p.name}` : (ord?.deliveryPoint || [ord?.viloyat, ord?.tuman, ord?.pochtaJoyi].filter(Boolean).join(', ') || pid);
        if (!byRegion[regionName]) byRegion[regionName] = [];
        byRegion[regionName].push({ id: pid, name: displayName, count: pochtaCounts[pid] });
    });
    pochtaRegionList.innerHTML = Object.entries(byRegion).map(([region, items]) => `
        <div class="pochta-region-block">
            <h4 class="pochta-region-title">${region}</h4>
            <div class="pochta-region-items">
                ${items.map(item => `
                    <button class="pochta-item-btn" data-pochta-id="${item.id}">
                        <span class="pochta-item-name">${item.name}</span>
                        <span class="pochta-item-count">${item.count} ta buyurtma</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');
    pochtaRegionList.querySelectorAll('.pochta-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedPochtaId = btn.dataset.pochtaId;
            renderOrders();
        });
    });
}

function renderOrdersByPochta(pochtaId) {
    const titleEl = document.getElementById('pochtaOrdersTitle');
    const listEl = document.getElementById('ordersListByPochta');
    const emptyEl = document.getElementById('ordersEmptyByPochta');
    if (!listEl) return;
    const p = jamiykiyPochtalar.find(x => x.id === pochtaId);
    let displayName = p ? `${p.district}, ${p.name}` : pochtaId;
    if (pochtaId.startsWith('gen-')) {
        const o = orders.find(x => x.pochtaId === pochtaId);
        displayName = o?.deliveryPoint || pochtaId.replace('gen-', '').replace(/-/g, ' ');
    }
    if (titleEl) titleEl.textContent = displayName;
    const pochtaOrders = orders.filter(o => (o.pochtaId || '') === pochtaId || (o.deliveryPoint && 'custom-' + o.deliveryPoint.replace(/\s+/g, '-').replace(/[^\w-]/g, '') === pochtaId));
    if (pochtaOrders.length === 0) {
        listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    listEl.innerHTML = pochtaOrders.map((order, i) => {
        const itemsHtml = order.items.map(item => `
            <div class="order-item">
                <img src="${item.image || ''}" alt="${item.name}" class="order-item-img">
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}${item.itemId ? ` <span class="order-item-id">#${item.itemId}</span>` : ''}</div>
                    <div class="order-item-meta">${formatPrice(item.price)} × ${item.quantity}</div>
                </div>
            </div>
        `).join('');
        const locInfo = [order.viloyat, order.tuman, order.pochtaJoyi || (order.deliveryPoint || '').replace(/Jamiykiy\s*/g, '')].filter(Boolean).join(', ');
        return `
            <div class="order-card">
                <div class="order-card-header">
                    <span class="order-num">${order.orderId || (i + 1)}</span>
                    <span class="order-date">${order.date}</span>
                </div>
                ${locInfo ? `<div class="order-location">📍 ${locInfo}</div>` : ''}
                <div class="order-card-body">${itemsHtml}</div>
                <div class="order-card-footer"><strong>${formatPrice(order.totalPrice)}</strong></div>
            </div>
        `;
    }).join('');
}

document.getElementById('backToPochtaList')?.addEventListener('click', () => {
    selectedPochtaId = null;
    renderOrders();
});

function showView(viewName) {
    [viewHome, viewCatalog, viewCategory, viewFavorites, viewTezkor, viewBuyurtmalar, viewProfil].forEach(v => {
        if (v) v.style.display = 'none';
    });
    document.querySelectorAll('.banners').forEach(el => { if (el) el.style.display = 'none'; });
    const searchWrap = document.getElementById('searchResultsWrap');
    if (searchWrap) searchWrap.style.display = 'none';

    if (viewName === 'home') {
        if (viewHome) viewHome.style.display = 'block';
        document.querySelectorAll('.banners').forEach(el => { if (el) el.style.display = 'block'; });
        renderProducts(filteredProducts());
        renderAksiyaProducts();
    } else if (viewName === 'catalog') {
        if (viewCatalog) { viewCatalog.style.display = 'block'; renderCatalog(); }
    } else if (viewName === 'category') {
        if (viewCategory) { viewCategory.style.display = 'block'; renderCategoryProducts(currentCategoryId); }
    } else if (viewName === 'favorites') {
        if (viewFavorites) { viewFavorites.style.display = 'block'; renderFavorites(); }
    } else if (viewName === 'tezkor') {
        if (viewTezkor) { viewTezkor.style.display = 'block'; renderTezkor(); }
    } else if (viewName === 'buyurtmalar') {
        selectedPochtaId = null;
        if (viewBuyurtmalar) { viewBuyurtmalar.style.display = 'block'; renderOrders(); }
    } else if (viewName === 'profil') {
        if (viewProfil) viewProfil.style.display = 'block';
    }
}

function renderCatalog() {
    const grid = document.getElementById('catalogCategories');
    const catalogSearch = document.getElementById('catalogSearch');
    const catalogSearchProducts = document.getElementById('catalogSearchProducts');
    const catalogProductsGrid = document.getElementById('catalogProductsGrid');
    const catalogProductsEmpty = document.getElementById('catalogProductsEmpty');
    if (!grid) return;
    const query = (catalogSearch && catalogSearch.value || '').toLowerCase().trim();
    let items = catalogCategories;
    if (query) items = catalogCategories.filter(c => c.name.toLowerCase().includes(query));
    grid.innerHTML = items.map((cat, i) => `
        <div class="catalog-card-wrap" style="--cat-color:${cat.color}">
            <a href="#" class="catalog-card" data-category="${cat.id}">
                <div class="catalog-card-icon" style="background:linear-gradient(135deg,${cat.color}20,${cat.color}10);color:${cat.color}">
                    <span>${cat.icon}</span>
                </div>
                <div class="catalog-card-content">
                    <span class="catalog-card-title">${cat.name}</span>
                    ${cat.sub ? `<span class="catalog-card-sub">${cat.sub}</span>` : ''}
                </div>
                <div class="catalog-card-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </a>
            <button class="catalog-card-add-btn" data-category="${cat.id}" title="Mahsulot qo'shish">+</button>
        </div>
    `).join('');
    grid.querySelectorAll('.catalog-card').forEach(el => {
        el.addEventListener('click', (e) => { e.preventDefault(); openCategory(el.dataset.category); });
    });
    grid.querySelectorAll('.catalog-card-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openAddProductModal(btn.dataset.category);
        });
    });

    if (query && catalogSearchProducts && catalogProductsGrid && catalogProductsEmpty) {
        const allProducts = getAllProducts();
        const matchedProducts = allProducts.filter(p => {
            const cat = catalogCategories.find(c => c.id === p.categoryId);
            const catName = (cat && cat.name) ? cat.name.toLowerCase() : '';
            const searchIn = [p.name, (p.brand || ''), (p.description || ''), catName].join(' ').toLowerCase();
            return searchIn.includes(query) && !isFavorite(p.id);
        });
        catalogSearchProducts.style.display = 'block';
        if (matchedProducts.length) {
            catalogProductsGrid.style.display = 'grid';
            catalogProductsEmpty.style.display = 'none';
            catalogProductsGrid.innerHTML = matchedProducts.map(p => renderProductCard(p, false)).join('');
            attachProductListeners(catalogProductsGrid);
        } else {
            catalogProductsGrid.style.display = 'none';
            catalogProductsEmpty.style.display = 'block';
        }
    } else if (catalogSearchProducts) {
        catalogSearchProducts.style.display = 'none';
    }
}

function openCategory(categoryId) {
    currentCategoryId = categoryId;
    currentSubcategoryId = 'all';
    const cat = catalogCategories.find(c => c.id === categoryId);
    const titleEl = document.getElementById('categoryTitle');
    const countEl = document.getElementById('categoryCount');
    const categoryTopBar = document.getElementById('categoryTopBar');
    const categorySortFilters = document.getElementById('categorySortFilters');

    if (titleEl) titleEl.textContent = cat ? cat.name : '';
    if (categoryTopBar) categoryTopBar.style.display = 'flex';
    if (categorySortFilters) categorySortFilters.style.display = 'flex';

    const subcats = categorySubcategories[categoryId];
    const subPanels = document.getElementById('categorySubPanels');
    const subPanelsScroll = document.getElementById('subPanelsScroll');

    if (subPanelsScroll && subPanels) {
        if (subcats && subcats.length) {
            subPanels.style.display = 'block';
            subPanelsScroll.innerHTML = '<button class="sub-panel-btn active" data-sub="all">Barchasi</button>' +
                subcats.map(s => `<button class="sub-panel-btn" data-sub="${s.id}">${s.name}</button>`).join('');
            subPanelsScroll.querySelectorAll('.sub-panel-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentSubcategoryId = btn.dataset.sub;
                    subPanelsScroll.querySelectorAll('.sub-panel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    renderCategoryProducts(currentCategoryId);
                });
            });
        } else subPanels.style.display = 'none';
    }

    filterRang = filterBrend = filterNarx = filterIshlab = '';
    setupFilterDropdowns();
    showView('category');
}

function setupFilterDropdowns() {
    const rangEl = document.getElementById('filterRang');
    const brendEl = document.getElementById('filterBrend');
    const ishlabEl = document.getElementById('filterIshlab');
    if (rangEl) rangEl.innerHTML = '<button class="filter-option" data-value="">Hammasi</button>' + colors.map(c => `<button class="filter-option" data-value="${c}">${c}</button>`).join('');
    const brands = categoryBrands[currentCategoryId] || categoryBrands.default;
    if (brendEl) brendEl.innerHTML = '<button class="filter-option" data-value="">Hammasi</button>' + brands.map(b => `<button class="filter-option" data-value="${b}">${b}</button>`).join('');
    if (ishlabEl) ishlabEl.innerHTML = '<button class="filter-option" data-value="">Hammasi</button>' + countries.map(c => `<button class="filter-option" data-value="${c}">${c}</button>`).join('');
}

function renderCategoryProducts(categoryId) {
    const grid = document.getElementById('categoryProducts');
    const countEl = document.getElementById('categoryCount');
    const categorySearchInput = document.getElementById('categorySearch');
    if (!grid) return;

    const all = getAllProducts();
    let items = all.filter(p => p.categoryId === categoryId && !isFavorite(p.id));
    const subcats = categorySubcategories[categoryId];

    if (subcats && currentSubcategoryId !== 'all') {
        items = items.filter(p => (p.subcategoryId || subcats[0]?.id) === currentSubcategoryId);
    }
    const searchQ = (categorySearchInput && categorySearchInput.value || '').toLowerCase().trim();
    if (searchQ) items = items.filter(p => p.name.toLowerCase().includes(searchQ));
    if (filterRang) items = items.filter(p => (p.color || '').toLowerCase() === filterRang.toLowerCase());
    if (filterBrend) items = items.filter(p => (p.brand || '').toLowerCase().includes(filterBrend.toLowerCase()));
    if (filterIshlab) items = items.filter(p => (p.madeIn || '').toLowerCase() === filterIshlab.toLowerCase());
    if (filterNarx === 'narx-osh') items = [...items].sort((a, b) => a.price - b.price);
    else if (filterNarx === 'narx-kam') items = [...items].sort((a, b) => b.price - a.price);
    else if (filterNarx === 'baho') items = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    if (countEl) countEl.textContent = items.length + ' ta tovar';
    grid.className = 'category-products category-products-enhanced';
    grid.innerHTML = items.map(p => renderProductCard(p, false)).join('');
    attachProductListeners(grid);
}

document.getElementById('backToCatalog')?.addEventListener('click', () => showView('catalog'));

document.getElementById('categorySearch')?.addEventListener('input', () => renderCategoryProducts(currentCategoryId));

document.querySelectorAll('.filter-dropdown-wrap').forEach(wrap => {
    wrap.addEventListener('click', (e) => {
        const opt = e.target.closest('.filter-option');
        const btn = e.target.closest('.sort-filter-btn');
        if (opt) {
            const val = opt.dataset.value || '';
            const parentId = opt.closest('.filter-dropdown')?.id;
            if (parentId === 'filterRang') filterRang = val;
            else if (parentId === 'filterBrend') filterBrend = val;
            else if (parentId === 'filterNarx') filterNarx = val;
            else if (parentId === 'filterIshlab') filterIshlab = val;
            wrap.querySelectorAll('.filter-dropdown').forEach(d => d.style.display = 'none');
            renderCategoryProducts(currentCategoryId);
        }
        if (btn) {
            document.querySelectorAll('.filter-dropdown').forEach(d => d.style.display = 'none');
            const f = btn.dataset.filter;
            const dd = document.getElementById('filter' + f.charAt(0).toUpperCase() + f.slice(1));
            if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
        }
    });
});

document.getElementById('catalogSearch')?.addEventListener('input', renderCatalog);

// Cart
function openCart() {
    cartSidebar?.classList.add('active');
    cartOverlay?.classList.add('active');
}

bottomCartBtn?.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
closeCart?.addEventListener('click', () => {
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
});
cartOverlay?.addEventListener('click', () => {
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
});

// Payment
let paymentType = 'naqt';
let nasiyaMonths = 0;

const cartPaymentPanelValue = document.getElementById('cartPaymentPanelValue');
const cartPaymentPanelBtn = document.getElementById('cartPaymentPanelBtn');
const cartPaymentPanelBody = document.getElementById('cartPaymentPanelBody');

function updatePaymentValue() {
    if (cartPaymentPanelValue) {
        cartPaymentPanelValue.textContent = paymentType === 'naqt' ? 'Naqt' : (nasiyaMonths ? `Nasiya ${nasiyaMonths} oy` : 'Nasiya');
    }
}

cartPaymentPanelBtn?.addEventListener('click', () => {
    cartPaymentPanelBody?.classList.toggle('expanded');
});

document.querySelectorAll('.cart-payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        paymentType = tab.dataset.type;
        document.querySelectorAll('.cart-payment-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const nasiyaEl = document.getElementById('cartNasiyaOptions');
        const instEl = document.getElementById('cartInstallmentInfo');
        if (paymentType === 'nasiya') {
            if (nasiyaEl) nasiyaEl.style.display = 'flex';
        } else {
            if (nasiyaEl) nasiyaEl.style.display = 'none';
            if (instEl) instEl.style.display = 'none';
            nasiyaMonths = 0;
            document.querySelectorAll('.cart-nasiya-btn').forEach(b => b.classList.remove('active'));
        }
        updatePaymentValue();
    });
});

document.querySelectorAll('.cart-nasiya-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        nasiyaMonths = parseInt(btn.dataset.months);
        document.querySelectorAll('.cart-nasiya-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const instEl = document.getElementById('cartInstallmentInfo');
        if (instEl) {
            instEl.textContent = `${nasiyaMonths} oyga — ${formatPrice(Math.round(totalPrice / nasiyaMonths))}/oyiga`;
            instEl.style.display = 'block';
        }
        updatePaymentValue();
    });
});

document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) return;
    const pochtaSel = document.getElementById('cartPochtaSelect');
    const pochtaVal = pochtaSel?.value;
    const pochtaOpt = pochtaSel?.selectedOptions?.[0];
    const deliveryPoint = pochtaOpt?.dataset?.name || pochtaOpt?.textContent || pochtaVal;
    if (!pochtaVal || !deliveryPoint) {
        alert('Pochtani tanlang');
        return;
    }
    if (paymentType === 'nasiya' && !nasiyaMonths) {
        alert('Nasiya muddatini tanlang (3, 6, 12 yoki 24 oy)');
        return;
    }
    const pochtaObj = jamiykiyPochtalar.find(p => p.id === pochtaVal);
    const viloyat = pochtaObj ? pochtaObj.regionName : (localStorage.getItem('uzum_region') || selectedRegion || 'Toshkent');
    const tuman = pochtaObj ? pochtaObj.district : (localStorage.getItem('uzum_tuman') || selectedTuman || '');
    const pochtaJoyi = pochtaObj ? pochtaObj.name : deliveryPoint;
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = generateOrderId();
    const orderItems = cart.map(item => ({ ...item, itemId: generateOrderItemId() }));
    orders.unshift({
        id: orders.length + 1,
        orderId,
        items: orderItems,
        totalPrice,
        paymentType,
        nasiyaMonths: paymentType === 'nasiya' ? nasiyaMonths : null,
        date: new Date().toLocaleString('uz-UZ'),
        pochtaId: pochtaVal,
        viloyat,
        tuman,
        pochtaJoyi,
        deliveryPoint: pochtaObj ? pochtaObj.district + ', ' + pochtaObj.name : deliveryPoint
    });
    saveOrders();
    alert('Buyurtma qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
    cart = [];
    saveCart();
    updateCartUI();
    renderProducts(filteredProducts());
    renderAksiyaProducts();
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
});

// Search
searchInput?.addEventListener('input', () => {
    renderProducts(filteredProducts());
    renderAksiyaProducts();
});

// Theme
const htmlTheme = document.getElementById('htmlTheme');
const themeLight = document.getElementById('themeLight');
const themeDark = document.getElementById('themeDark');
const savedTheme = localStorage.getItem('uzum_theme') || 'light';

function setTheme(theme) {
    if (htmlTheme) htmlTheme.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    if (themeLight) themeLight.classList.toggle('active', theme === 'light');
    if (themeDark) themeDark.classList.toggle('active', theme === 'dark');
    localStorage.setItem('uzum_theme', theme);
}

themeLight?.addEventListener('click', () => setTheme('light'));
themeDark?.addEventListener('click', () => setTheme('dark'));
setTheme(savedTheme);

// Location
let selectedRegion = localStorage.getItem('uzum_region') || 'Toshkent';
let selectedTuman = localStorage.getItem('uzum_tuman') || '';
const locationBtn = document.getElementById('locationBtn');
const locationText = document.getElementById('locationText');
const locationModal = document.getElementById('locationModal');
const locationModalClose = document.getElementById('locationModalClose');
const locationList = document.getElementById('locationList');

function openLocationModal() {
    locationModal?.classList.add('active');
    const tumanList = document.getElementById('locationTumanList');
    const tumanWrap = document.getElementById('tumanStepWrap');
    if (locationList) {
        locationList.innerHTML = regions.map(r => `
            <button class="location-item ${r === selectedRegion ? 'selected' : ''}" data-region="${r}">${r}</button>
        `).join('');
        locationList.querySelectorAll('.location-item').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedRegion = btn.dataset.region;
                localStorage.setItem('uzum_region', selectedRegion);
                document.querySelectorAll('.location-item').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                const rid = regionToId[selectedRegion] || 'toshkent';
                const tumans = viloyatTumanlari[rid] || [];
                if (tumanList) {
                    tumanList.innerHTML = tumans.map(t => `
                        <button class="location-item ${t === selectedTuman ? 'selected' : ''}" data-tuman="${t}">${t}</button>
                    `).join('');
                    tumanList.querySelectorAll('.location-item').forEach(tBtn => {
                        tBtn.addEventListener('click', () => {
                            selectedTuman = tBtn.dataset.tuman;
                            localStorage.setItem('uzum_tuman', selectedTuman);
                            if (locationText) locationText.textContent = selectedRegion + ', ' + selectedTuman;
                            locationModal?.classList.remove('active');
                            updateCartPochtaSelect();
                        });
                    });
                }
                if (tumanWrap) tumanWrap.style.display = 'block';
            });
        });
    }
    if (tumanWrap && selectedRegion) {
        const rid = regionToId[selectedRegion] || 'toshkent';
        const tumans = viloyatTumanlari[rid] || [];
        if (tumanList) {
            tumanList.innerHTML = tumans.map(t => `
                <button class="location-item ${t === selectedTuman ? 'selected' : ''}" data-tuman="${t}">${t}</button>
            `).join('');
            tumanList.querySelectorAll('.location-item').forEach(tBtn => {
                tBtn.addEventListener('click', () => {
                    selectedTuman = tBtn.dataset.tuman;
                    localStorage.setItem('uzum_tuman', selectedTuman);
                    if (locationText) locationText.textContent = selectedRegion + ', ' + selectedTuman;
                    locationModal?.classList.remove('active');
                    updateCartPochtaSelect();
                });
            });
        }
        tumanWrap.style.display = tumans.length ? 'block' : 'none';
    } else if (tumanWrap) tumanWrap.style.display = 'none';
}

locationBtn?.addEventListener('click', openLocationModal);
document.getElementById('cartPochtaLocationBtn')?.addEventListener('click', () => {
    openLocationModal();
});
locationModalClose?.addEventListener('click', () => locationModal?.classList.remove('active'));
locationModal?.addEventListener('click', (e) => { if (e.target === locationModal) locationModal.classList.remove('active'); });
if (locationText) locationText.textContent = selectedTuman ? selectedRegion + ', ' + selectedTuman : selectedRegion;

// Mahsulot qo'shish
const addProductModal = document.getElementById('addProductModal');
const addProductForm = document.getElementById('addProductForm');
const addProductHeaderBtn = document.getElementById('addProductHeaderBtn');
const closeAddProduct = document.getElementById('closeAddProduct');

function openAddProductModal(presetCategoryId, presetSubcategoryId) {
    addProductModal?.classList.add('active');
    if (presetCategoryId) {
        const catEl = document.getElementById('productCategory');
        if (catEl) {
            catEl.value = presetCategoryId;
            updateProductSubcategoryOptions(presetCategoryId);
            const subEl = document.getElementById('productSubcategory');
            const formSub = document.getElementById('formSubcategory');
            if (subEl && formSub) {
                formSub.style.display = categorySubcategories[presetCategoryId] ? 'block' : 'none';
                if (presetSubcategoryId && presetSubcategoryId !== 'all') subEl.value = presetSubcategoryId;
            }
        }
    }
}

function updateProductSubcategoryOptions(categoryId) {
    const subEl = document.getElementById('productSubcategory');
    const formSub = document.getElementById('formSubcategory');
    if (!subEl || !formSub) return;
    const subcats = categorySubcategories[categoryId];
    if (subcats && subcats.length) {
        formSub.style.display = 'block';
        subEl.innerHTML = '<option value="">Tanlang</option>' + subcats.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    } else {
        formSub.style.display = 'none';
        subEl.innerHTML = '<option value="">Tanlang</option>';
    }
}

addProductHeaderBtn?.addEventListener('click', () => openAddProductModal());

document.getElementById('addProductCategoryBtn')?.addEventListener('click', () => {
    if (currentCategoryId) openAddProductModal(currentCategoryId, currentSubcategoryId !== 'all' ? currentSubcategoryId : '');
});
document.getElementById('addProductCatalogBtn')?.addEventListener('click', () => openAddProductModal());
document.getElementById('addProductCatalogSearchBtn')?.addEventListener('click', () => openAddProductModal());

closeAddProduct?.addEventListener('click', () => {
    addProductModal?.classList.remove('active');
});

addProductModal?.addEventListener('click', (e) => {
    if (e.target === addProductModal) addProductModal.classList.remove('active');
});

document.getElementById('productCategory')?.addEventListener('change', function() {
    updateProductSubcategoryOptions(this.value);
});

addProductForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value.trim();
    const price = parseInt(document.getElementById('productPrice').value) || 0;
    const oldPriceVal = parseInt(document.getElementById('productOldPrice').value) || null;
    const img1 = document.getElementById('productImage').value.trim();
    const img2 = (document.getElementById('productImage2') && document.getElementById('productImage2').value) ? document.getElementById('productImage2').value.trim() : '';
    const img3 = (document.getElementById('productImage3') && document.getElementById('productImage3').value) ? document.getElementById('productImage3').value.trim() : '';
    const images = [img1, img2, img3].filter(u => u);
    const categoryId = document.getElementById('productCategory').value;
    const subEl = document.getElementById('productSubcategory');
    const subcategoryId = subEl && subEl.value ? subEl.value : null;
    const brand = document.getElementById('productBrand').value.trim() || '';
    const color = document.getElementById('productColor').value.trim() || '';
    const madeIn = document.getElementById('productMadeIn').value.trim() || '';
    const isAksiya = document.getElementById('productAksiya').checked;

    const maxId = Math.max(0, ...products.map(p => p.id), ...merchantProducts.map(p => p.id || 0));
    const newProduct = {
        id: maxId + 1,
        name,
        price,
        oldPrice: isAksiya && oldPriceVal && oldPriceVal > price ? oldPriceVal : null,
        image: images[0] || '',
        images,
        categoryId,
        subcategoryId: subcategoryId || undefined,
        brand,
        color,
        madeIn,
        description: name,
        rating: 4.5,
        reviews: 0
    };

    merchantProducts.push(newProduct);
    localStorage.setItem('uzum_merchant_products', JSON.stringify(merchantProducts));
    addProductForm.reset();
    addProductModal?.classList.remove('active');
    renderProducts(filteredProducts());
    renderAksiyaProducts();
    alert('Mahsulot muvaffaqiyatli qo\'shildi!');
});

// Header fav
document.getElementById('headerFavBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('.nav-item[data-view="favorites"]')?.classList.add('active');
    showView('favorites');
});

// Bottom nav
document.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        showView(view);
    });
});

// Fav delegatsiya
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.product-fav');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = btn.dataset.id;
    if (!id) return;
    toggleFavorite(id);
    btn.classList.toggle('active', isFavorite(id));
});

// Aksiya sanasi o'zgarishi (kun, oy, yil)
['aksiyaDay', 'aksiyaMonth', 'aksiyaYear'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', function() {
        syncAksiyaDateFromSelects();
        renderAksiyaProducts();
    });
});

// Ramazon banner — xaridlarga o'tish
document.getElementById('bannerRamazon')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const catalogItem = document.querySelector('.nav-item[data-view="catalog"]');
    if (catalogItem) catalogItem.classList.add('active');
    showView('catalog');
});

// Init
renderProducts(filteredProducts());
renderAksiyaProducts();
updateCartUI();
renderFavorites();

// Sotuvchi panelidan ?addToCart=ID orqali kelganda
(function() {
    const params = new URLSearchParams(window.location.search);
    const addId = params.get('addToCart');
    if (addId) {
        const id = parseInt(addId) || addId;
        const prod = getAllProducts().find(p => p.id == id);
        if (prod) {
            addToCart(id);
            openCart();
            history.replaceState({}, '', window.location.pathname);
        }
    }
})();
