// Sotuvchi paneli — Mutaxasis ishchilar (qo'shish/yaratish yo'q)

const regions = [
    'Toshkent', 'Andijon', 'Buxoro', "Farg'ona", 'Jizzax', 'Xorazm',
    'Namangan', 'Navoiy', "Qashqadaryo", 'Samarqand', 'Sirdaryo', "Surxondaryo"
];

const regionToId = { 'Toshkent':'toshkent','Andijon':'andijon','Buxoro':'buxoro',"Farg'ona":'fargona','Jizzax':'jizzax','Xorazm':'xorazm','Namangan':'namangan','Navoiy':'navoiy',"Qashqadaryo":'qashqadaryo','Samarqand':'samarqand','Sirdaryo':'sirdaryo','Surxondaryo':'surxondaryo' };

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
    { id: 'xobbi', name: "Xobbi va ijod", sub: '', icon: '🎸', color: '#f97316' },
    { id: 'smartfon', name: 'Smartfonlar', sub: '', icon: '📱', color: '#eab308' },
    { id: 'ramazon', name: 'Ramazonga tayyorgarlik', sub: '', icon: '🌙', color: '#7c3aed' },
    { id: 'mebel', name: 'Mebel', sub: '', icon: '🛋️', color: '#f97316' },
    { id: 'turizm', name: 'Turizm, baliq ovi va ovchilik', sub: '', icon: '🔥', color: '#f97316' },
    { id: 'elektronika', name: 'Elektronika', sub: '', icon: '🎧', color: '#64748b' },
    { id: 'maishiy', name: 'Maishiy texnika', sub: '', icon: '🔌', color: '#7c3aed' },
    { id: 'kiyim', name: 'Kiyim', sub: '', icon: '👕', color: '#3b82f6' },
    { id: 'poyabzal', name: 'Poyabzallar', sub: '', icon: '👟', color: '#ef4444' },
    { id: 'aksessuar', name: 'Aksessuarlar', sub: '', icon: '👜', color: '#f97316' },
    { id: 'parvarish', name: "Go'zallik va parvarish", sub: '', icon: '💄', color: '#ec4899' },
    { id: 'salomatlik', name: 'Salomatlik', sub: '', icon: '❤️', color: '#ef4444' },
    { id: 'uy', name: "Uy-ro'zg'or buyumlari", sub: '', icon: '🏠', color: '#f97316' },
    { id: 'qurilish', name: "Qurilish va ta'mirlash", sub: '', icon: '🔧', color: '#7c3aed' },
    { id: 'avto', name: 'Avtotovarlar', sub: '', icon: '🚗', color: '#ef4444' },
    { id: 'bolalar', name: 'Bolalar tovarlari', sub: '', icon: '🐴', color: '#7c3aed' },
    { id: 'oziq', name: "Oziq-ovqat mahsulotlari", sub: '', icon: '🍎', color: '#22c55e' },
    { id: 'kimyo', name: 'Maishiy kimyoviy moddalar', sub: '', icon: '🧴', color: '#3b82f6' },
    { id: 'kanselyariya', name: 'Kanselyariya tovarlari', sub: '', icon: '📄', color: '#f97316' },
    { id: 'hayvon', name: 'Hayvonlar uchun tovarlar', sub: '', icon: '🐾', color: '#64748b' },
    { id: 'kitob', name: 'Kitoblar', sub: '', icon: '📚', color: '#f97316' },
    { id: 'dacha', name: "Dacha, bog' va tomorqa", sub: '', icon: '🌱', color: '#22c55e' },
    { id: 'reabilitatsiya', name: 'Reabilitatsiya uchun subsidivalangan mahsulotlar', sub: '', icon: '❤️', color: '#f97316' }
];

const categorySubcategories = {
    gozallik: [
        { id: 'parvarish', name: "Go'zallik va parvarish" },
        { id: 'makiyaj', name: 'Makiyaj' },
        { id: 'yuz', name: 'Yuz parvarishi' },
        { id: 'koz', name: "Ko'zlar" },
        { id: 'manikyur', name: 'Manikyur va pedikyur' },
        { id: 'soch', name: 'Soch parvarishi' },
        { id: 'tana', name: 'Tana parvarishi' },
        { id: 'atir', name: 'Atir-atir' }
    ],
    maishiy: [
        { id: 'muzlatgich', name: 'Muzlatgichlar' },
        { id: 'tv', name: 'TV va video' },
        { id: 'pishirish', name: 'Pishirish' },
        { id: 'tozalash', name: 'Tozalash' },
        { id: 'kiyim_yuvish', name: 'Kiyim yuvish' }
    ],
    kiyim: [
        { id: 'erkaklar', name: 'Erkaklar' },
        { id: 'ayollar', name: 'Ayollar' },
        { id: 'bolalar', name: 'Bolalar' }
    ],
    smartfon: [
        { id: 'apple', name: 'Apple' },
        { id: 'samsung', name: 'Samsung' },
        { id: 'xiaomi', name: 'Xiaomi' },
        { id: 'boshqa', name: 'Boshqa' }
    ],
    elektronika: [
        { id: 'noutbuk', name: 'Noutbuklar' },
        { id: 'planshet', name: 'Planshetlar' },
        { id: 'quloqchin', name: 'Quloqchinlar' },
        { id: 'aksessuar', name: 'Aksessuarlar' }
    ],
    uy: [
        { id: 'idish', name: 'Idish-tovoq' },
        { id: 'dekor', name: 'Dekoratsiya' },
        { id: 'matress', name: 'Matras va choyshab' }
    ],
    poyabzal: [
        { id: 'erakk', name: 'Erkaklar uchun' },
        { id: 'ayol', name: 'Ayollar uchun' },
        { id: 'sport', name: 'Sport' }
    ],
    aksessuar: [
        { id: 'sumka', name: 'Sumkalar' },
        { id: 'soat', name: 'Soatlar' },
        { id: 'kozlama', name: 'Kozlamalar' }
    ],
    oziq: [
        { id: 'non', name: 'Non mahsulotlari' },
        { id: 'sut', name: 'Sut mahsulotlari' },
        { id: 'meva', name: 'Meva-sabzavot' }
    ]
};

const products = [
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 13999000, oldPrice: 15499000, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", categoryId: 'smartfon', subcategoryId: 'samsung', rating: 4.8, reviews: 1892, description: "Samsung Galaxy S24 Ultra", brand: 'Samsung', color: 'Qora', madeIn: 'Janubiy Koreya' },
    { id: 3, name: "MacBook Pro 14\" M3", price: 24999000, oldPrice: 26999000, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", categoryId: 'elektronika', brand: 'Apple', color: 'Kulrang', madeIn: 'AQSh' },
    { id: 4, name: "AirPods Pro 2", price: 2999000, oldPrice: 3299000, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400", categoryId: 'aksessuar', brand: 'Apple', color: 'Oq', madeIn: 'Xitoy' },
    { id: 5, name: "Samsung Smart TV 55\" 4K", price: 7999000, oldPrice: 8999000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400", categoryId: 'maishiy', subcategoryId: 'tv', rating: 4.7, reviews: 562, description: "4K Smart TV", brand: 'Samsung', color: 'Qora', madeIn: 'Janubiy Koreya' },
    { id: 6, name: "Dyson V15 vacuum", price: 5999000, oldPrice: 6999000, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400", categoryId: 'maishiy', subcategoryId: 'tozalash', rating: 4.9, reviews: 890, description: "Quvvatli changyutgich", brand: 'Boshqa', color: 'Kulrang', madeIn: 'Xitoy' },
    { id: 7, name: "Nike Air Max 90", price: 1299000, oldPrice: 1499000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", categoryId: 'poyabzal', subcategoryId: 'sport', rating: 4.8, reviews: 456, description: "Sport poyabzal", brand: 'Nike', color: 'Oq', madeIn: 'Xitoy' },
    { id: 8, name: "Adidas Sport T-shirt", price: 299000, oldPrice: 399000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", categoryId: 'kiyim', subcategoryId: 'erkaklar', rating: 4.6, reviews: 234, description: "Sport futbolka", brand: 'Adidas', color: 'Qora', madeIn: 'Xitoy' },
    { id: 9, name: "Redmi Note 14 8GB 256GB 108MP", price: 1899050, oldPrice: 2199050, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400", categoryId: 'smartfon', brand: 'Xiaomi', color: 'Kulrang', madeIn: 'Xitoy' },
    { id: 10, name: "Smart Ring", price: 113985, oldPrice: 149000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", categoryId: 'aksessuar', brand: 'Boshqa', color: 'Kulrang', madeIn: 'Xitoy' },
    { id: 11, name: "Idish to'plami 6 dona", price: 551384, oldPrice: 649000, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400", categoryId: 'uy', brand: 'Boshqa', color: 'Oq', madeIn: 'O\'zbekiston' },
    { id: 12, name: "NIVEA Lablar uchun balzam, qulupnay porlashi 4.8gr", price: 26991, oldPrice: 29990, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", categoryId: 'gozallik', subcategoryId: 'parvarish', rating: 4.9, reviews: 1174, description: "NIVEA lablar uchun balzam", brand: 'NIVEA', color: 'Pushti', madeIn: 'Germaniya' },
    { id: 13, name: "3D effektli ulama kipriklar, kiprik kleyi va tarog'i bilan", price: 25191, oldPrice: 27990, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400", categoryId: 'gozallik', subcategoryId: 'makiyaj', rating: 4.7, reviews: 1865, description: "3D effektli ulama kipriklar", brand: 'Maybelline', color: 'Qora', madeIn: 'Xitoy' },
    { id: 14, name: "L'Oreal yuz kremi, namlovchi 50ml", price: 89900, oldPrice: 99900, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", categoryId: 'gozallik', subcategoryId: 'yuz', rating: 4.8, reviews: 892, description: "Yuz terisini namlab krem", brand: 'L\'Oreal', color: 'Oq', madeIn: 'Fransiya' }
];

let merchantProducts = JSON.parse(localStorage.getItem('uzum_merchant_products')) || [];
let favorites = JSON.parse(localStorage.getItem('uzum_favorites')) || [];
let orders = JSON.parse(localStorage.getItem('uzum_orders')) || [];
let cart = JSON.parse(localStorage.getItem('uzum_cart')) || [];

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
    renderFavorites();
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
    renderProducts();
    if (aksiyaGrid) renderAksiyaProducts();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    saveCart();
    updateCartUI();
    renderProducts();
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
    const bottomCartCount = document.getElementById('bottomCartCount');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
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

function openCart() {
    document.getElementById('cartSidebar')?.classList.add('active');
    document.getElementById('cartOverlay')?.classList.add('active');
}

const viewHome = document.getElementById('viewHome');
const productsGrid = document.getElementById('productsGrid');
const aksiyaGrid = document.getElementById('aksiyaGrid');
const viewCatalog = document.getElementById('viewCatalog');
const viewFavorites = document.getElementById('viewFavorites');
const viewBuyurtmalar = document.getElementById('viewBuyurtmalar');
const viewProfil = document.getElementById('viewProfil');
const viewCategory = document.getElementById('viewCategory');

let currentCategoryId = null;
let currentSubcategoryId = 'all';
let selectedPochtaId = null;

function showView(viewName) {
    [viewHome, viewCatalog, viewFavorites, viewBuyurtmalar, viewProfil, viewCategory].forEach(v => {
        if (v) v.style.display = 'none';
    });
    document.querySelectorAll('.banners').forEach(el => { if (el) el.style.display = 'none'; });

    if (viewName === 'home') {
        viewHome.style.display = 'block';
        document.querySelectorAll('.banners').forEach(el => { if (el) el.style.display = 'block'; });
        renderProducts();
        if (aksiyaGrid) renderAksiyaProducts();
    } else if (viewName === 'catalog') {
        viewCatalog.style.display = 'block';
        renderCatalog();
    } else if (viewName === 'favorites') {
        viewFavorites.style.display = 'block';
        renderFavorites();
    } else if (viewName === 'buyurtmalar') {
        selectedPochtaId = null;
        if (viewBuyurtmalar) { viewBuyurtmalar.style.display = 'block'; renderOrders(); }
    } else if (viewName === 'profil') {
        viewProfil.style.display = 'block';
    } else if (viewName === 'category') {
        viewCategory.style.display = 'block';
        renderCategoryProducts(currentCategoryId);
    }
}

function filteredProducts() {
    const query = (document.getElementById('searchInput') && document.getElementById('searchInput').value || '').toLowerCase().trim();
    const all = getAllProducts();
    if (!query) return all;
    return all.filter(p => {
        const cat = catalogCategories.find(c => c.id === p.categoryId);
        const catName = cat ? cat.name : '';
        const searchIn = [p.name, p.details || '', p.description || '', p.merchantName || '', catName].join(' ').toLowerCase();
        return searchIn.includes(query);
    });
}

function renderProducts() {
    if (!productsGrid) return;
    const toShow = filteredProducts().filter(p => !isFavorite(p.id));
    productsGrid.innerHTML = toShow.map(product => renderProductCard(product)).join('');
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
    aksiyaGrid.innerHTML = aksiya.map(p => renderProductCardAksiya(p)).join('');
    attachProductListeners(aksiyaGrid);
}

function renderProductCardAksiya(product) {
    const inCart = cart.some(item => item.id == product.id);
    const cat = catalogCategories.find(c => c.id === product.categoryId);
    const accentColor = cat ? cat.color : '#7c3aed';
    const images = getProductImages(product);
    const imgUrl = images[0] || '';
    const hasMultiImg = images.length > 1;
    return `
        <div class="product-card product-card-enhanced" style="--accent-color:${accentColor}" data-product-images='${JSON.stringify(images)}'>
            <div class="product-image-wrap">
                ${hasMultiImg ? `
                <div class="product-img-gallery">
                    <img src="${imgUrl}" alt="${product.name}" class="product-image product-gallery-img">
                    <div class="product-img-dots">${images.map((_, i) => `<span class="img-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join('')}</div>
                </div>
                ` : `<img src="${imgUrl}" alt="${product.name}" class="product-image">`}
                <button class="product-fav ${isFavorite(product.id) ? 'active' : ''}" data-id="${product.id}" title="Sevimlilarga">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
            <div class="product-info product-info-enhanced">
                <h3 class="product-name">${product.name}</h3>
                ${product.oldPrice ? `<span class="product-price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                <span class="product-price">${formatPrice(product.price)}</span>
                <button class="add-to-cart seller-order-btn" data-id="${product.id}" ${inCart ? 'disabled' : ''}>${inCart ? 'Savatda' : 'Buyurtma berish'}</button>
            </div>
        </div>
    `;
}

function renderProductCard(product) {
    const inCart = cart.some(item => item.id == product.id);
    const cat = catalogCategories.find(c => c.id === product.categoryId);
    const accentColor = cat ? cat.color : '#7c3aed';
    const images = getProductImages(product);
    const imgUrl = images[0] || '';
    const hasMultiImg = images.length > 1;
    return `
        <div class="product-card product-card-enhanced" style="--accent-color:${accentColor}" data-product-images='${JSON.stringify(images)}'>
            <div class="product-image-wrap">
                ${hasMultiImg ? `
                <div class="product-img-gallery">
                    <img src="${imgUrl}" alt="${product.name}" class="product-image product-gallery-img">
                    <div class="product-img-dots">${images.map((_, i) => `<span class="img-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join('')}</div>
                </div>
                ` : `<img src="${imgUrl}" alt="${product.name}" class="product-image">`}
                <button class="product-fav ${isFavorite(product.id) ? 'active' : ''}" data-id="${product.id}" title="Sevimlilarga">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
            <div class="product-info product-info-enhanced">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-price">${formatPrice(product.price)}</span>
                <button class="add-to-cart seller-order-btn" data-id="${product.id}" ${inCart ? 'disabled' : ''}>${inCart ? 'Savatda' : 'Buyurtma berish'}</button>
            </div>
        </div>
    `;
}

function attachProductListeners(container) {
    if (!container) return;
    container.querySelectorAll('.add-to-cart, .seller-order-btn').forEach(btn => {
        if (btn.dataset.id && !btn.disabled) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(parseInt(btn.dataset.id));
                openCart();
            });
        }
    });
    container.querySelectorAll('.product-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.dataset.id;
            if (id) { toggleFavorite(id); btn.classList.toggle('active', isFavorite(id)); }
        });
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

function renderCatalog() {
    const grid = document.getElementById('catalogCategories');
    if (!grid) return;
    grid.innerHTML = catalogCategories.map((cat, i) => `
        <a href="#" class="catalog-card" data-category="${cat.id}" style="--cat-color:${cat.color};--delay:${i * 0.02}s">
            <div class="catalog-card-icon" style="background:linear-gradient(135deg,${cat.color}20 0%,${cat.color}10 100%);color:${cat.color}">
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
    `).join('');
    grid.querySelectorAll('.catalog-card').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openCategory(el.dataset.category);
        });
    });
}

function openCategory(categoryId) {
    currentCategoryId = categoryId;
    currentSubcategoryId = 'all';
    const cat = catalogCategories.find(c => c.id === categoryId);
    const titleEl = document.getElementById('categoryTitle');
    const countEl = document.getElementById('categoryCount');
    if (titleEl) titleEl.textContent = cat ? cat.name : '';
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
        } else {
            subPanels.style.display = 'none';
        }
    }
    showView('category');
}

function renderCategoryProducts(categoryId) {
    const grid = document.getElementById('categoryProducts');
    const countEl = document.getElementById('categoryCount');
    if (!grid) return;
    const all = getAllProducts();
    let items = all.filter(p => p.categoryId === categoryId && !isFavorite(p.id));
    const subcats = categorySubcategories[categoryId];
    if (subcats && currentSubcategoryId !== 'all') {
        items = items.filter(p => (p.subcategoryId || subcats[0]?.id) === currentSubcategoryId);
    }
    if (countEl) countEl.textContent = items.length + ' ta tovar';
    grid.className = 'category-products category-products-enhanced';
    grid.innerHTML = items.map(p => renderProductCard(p)).join('');
    attachProductListeners(grid);
}

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const emptyEl = document.getElementById('favoritesEmpty');
    if (!grid) return;
    const all = getAllProducts();
    const favProducts = all.filter(p => favorites.some(f => f == p.id));
    if (emptyEl) emptyEl.style.display = favProducts.length ? 'none' : 'block';
    grid.innerHTML = favProducts.map(p => renderProductCard(p)).join('');
    grid.style.display = favProducts.length ? 'grid' : 'none';
    attachProductListeners(grid);
}

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

const backToCatalog = document.getElementById('backToCatalog');
if (backToCatalog) backToCatalog.addEventListener('click', () => showView('catalog'));

document.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        showView(view);
    });
});

const searchInput = document.getElementById('searchInput');
if (searchInput) searchInput.addEventListener('input', () => renderProducts());

// Aksiya vaqti faqat asosiy saytda o'rnatiladi; sotuvchi panelida faqat vaqt ko'rsatiladi

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

if (themeLight) themeLight.addEventListener('click', () => setTheme('light'));
if (themeDark) themeDark.addEventListener('click', () => setTheme('dark'));
setTheme(savedTheme);

let selectedRegion = localStorage.getItem('uzum_region') || 'Toshkent';
let selectedTuman = localStorage.getItem('uzum_tuman') || '';
const locationBtn = document.getElementById('locationBtn');
const locationText = document.getElementById('locationText');
const locationModal = document.getElementById('locationModal');
const locationModalClose = document.getElementById('locationModalClose');
const locationList = document.getElementById('locationList');

function openLocationModal() {
    if (locationModal) locationModal.classList.add('active');
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
                            locationModal.classList.remove('active');
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
                    locationModal.classList.remove('active');
                    updateCartPochtaSelect();
                });
            });
        }
        tumanWrap.style.display = tumans.length ? 'block' : 'none';
    } else if (tumanWrap) tumanWrap.style.display = 'none';
}

if (locationBtn) locationBtn.addEventListener('click', openLocationModal);
document.getElementById('cartPochtaLocationBtn')?.addEventListener('click', () => openLocationModal());
if (locationModalClose) locationModalClose.addEventListener('click', () => locationModal?.classList.remove('active'));
if (locationModal) locationModal.addEventListener('click', (e) => { if (e.target === locationModal) locationModal.classList.remove('active'); });
if (locationText) locationText.textContent = selectedTuman ? selectedRegion + ', ' + selectedTuman : selectedRegion;

// Cart
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');

cartOverlay?.addEventListener('click', () => {
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
});
closeCart?.addEventListener('click', () => {
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
});
document.getElementById('bottomCartBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

// Payment
let paymentType = 'naqt';
let nasiyaMonths = 0;
const cartPaymentPanelValue = document.getElementById('cartPaymentPanelValue');
const cartPaymentPanelBtn = document.getElementById('cartPaymentPanelBtn');
const cartPaymentPanelBody = document.getElementById('cartPaymentPanelBody');
function updatePaymentValue() {
    if (cartPaymentPanelValue) cartPaymentPanelValue.textContent = paymentType === 'naqt' ? 'Naqt' : (nasiyaMonths ? `Nasiya ${nasiyaMonths} oy` : 'Nasiya');
}
cartPaymentPanelBtn?.addEventListener('click', () => cartPaymentPanelBody?.classList.toggle('expanded'));
document.querySelectorAll('.cart-payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        paymentType = tab.dataset.type;
        document.querySelectorAll('.cart-payment-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const nasiyaEl = document.getElementById('cartNasiyaOptions');
        const instEl = document.getElementById('cartInstallmentInfo');
        if (paymentType === 'nasiya') { if (nasiyaEl) nasiyaEl.style.display = 'flex'; }
        else {
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
        if (instEl) { instEl.textContent = `${nasiyaMonths} oyga — ${formatPrice(Math.round(totalPrice / nasiyaMonths))}/oyiga`; instEl.style.display = 'block'; }
        updatePaymentValue();
    });
});

// Checkout
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
    renderProducts();
    if (aksiyaGrid) renderAksiyaProducts();
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
});

const headerFavBtn = document.getElementById('headerFavBtn');
if (headerFavBtn) {
    headerFavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        const favNav = document.querySelector('.nav-item[data-view="favorites"]');
        if (favNav) favNav.classList.add('active');
        showView('favorites');
    });
}

merchantProducts = JSON.parse(localStorage.getItem('uzum_merchant_products')) || [];
favorites = JSON.parse(localStorage.getItem('uzum_favorites')) || [];
orders = JSON.parse(localStorage.getItem('uzum_orders')) || [];
cart = JSON.parse(localStorage.getItem('uzum_cart')) || [];
updateCartUI();
showView('home');
