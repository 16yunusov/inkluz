const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const MENU_STORAGE_KEY = 'taste_menu';
const LANG_STORAGE_KEY = 'taste_lang';

const TEXTS = {
  uz: {
    nav_home: 'Bosh sahifa',
    nav_about: 'Biz haqimizda',
    nav_features: 'Afzalliklar',
    nav_menu: 'Menyu',
    nav_gallery: 'Galereya',
    nav_reviews: 'Sharhlar',
    nav_location: 'Manzil',
    nav_admin: 'Admin',
    brand_subtitle: 'Milliy taomlar',
    footer_brand_title: 'Taste of Uzbekistan',
    footer_brand_subtitle: 'Milliy taomlar',
    hero_kicker: 'Premium milliy taomlar',
    hero_title_accent: 'Haqqoniy milliy taomlar.',
    hero_title_rest: "To'g'ridan-to'g'ri uyingizga.",
    hero_subtitle: "Taste of Uzbekistan sizga plov, lag'mon, manti va boshqa sevimli milliy taomlarni zamonaviy, qulay onlayn yetkazib berish orqali taqdim etadi.",
    hero_cta_order: "Taom buyurtma qilish",
    hero_cta_menu: "Menyuni ko'rish",
    hero_meta_hours: 'Har kuni ochiq',
    hero_meta_address: 'Manzil',
    hero_meta_address_val: 'Aurora tumani, markaz',
    orbit_1_label: 'Milliy taomlar',
    orbit_1_sub: "Plov, lag'mon, manti",
    orbit_2_label: "Haqqoniy ta'm",
    orbit_2_sub: "An'anaviy retsept",
    orbit_3_label: 'Tez yetkazish',
    orbit_3_sub: "Shaharning har joyiga",
    about_placeholder: 'Barista ish jarayonida',
    about_kicker: 'Bizning hikoya',
    about_title: 'Qahvasevarlar uchun maskan.',
    about_p1: "Aurora Coffee House sokin, oltin on – birinchi qultumdan boshlangan odatimizdan tug'ilgan. Biz dunyoning kichik fermer xo'jaliklaridan xarakterga ega donlarni tanlab, har bir qovurish va tayyorlash bosqichiga e'tibor bilan yondashamiz.",
    about_p2: "Bizning ishtiyoqimiz – dunyoning turli burchaklaridan tanlab olingan donlardan mukammal qahva chashkasini yaratish. Ichkariga kiring, sekinlashin va hid, musiqa hamda yorug'lik sizni o'rab olsin.",
    about_stat1: 'Mamlakat donlari',
    about_stat2: 'Mamnun mehmonlar',
    about_stat3: "O'rtacha baho",
    features_kicker: 'Taste of Uzbekistan',
    features_title: "Har luqmada milliy ta'm.",
    feat1_title: 'Yangi qovurilgan donlar',
    feat1_p: "Halol manbalardan olingan, kichik partiyalarda qovurilgan donlar, bosh qovuruvchimiz tomonidan tanlangan totib ko'rish notalari bilan.",
    feat2_title: "Qo'lda tayyorlangan desertlar",
    feat2_p: "Har kuni ertalab oshxonamizda yangi pishiriladigan, qandolat uslubidagi desertlar qahvangiz uchun mukammal jo'r.",
    feat3_title: 'Qulay muhit',
    feat3_p: "Yumshoq yorug'lik, ehtiyotkorlik bilan tanlangan musiqa va uzoq suhbatlar uchun mo'ljallangan o'rindiqlar.",
    feat4_title: 'Tez xizmat',
    feat4_p: "Onlayn buyurtma va qulay jarayon ichimligingiz siz tayyor bo'lganda hozir bo'lishini ta'minlaydi.",
    menu_kicker: 'Menyular',
    menu_title: "Haqqoniy o'zbek taomlari.",
    cat_plov: 'Plov',
    cat_lagman: "Lag'mon",
    cat_manti: 'Manti',
    cat_shashlik: 'Shashlik',
    cat_somsa: 'Somsa',
    cat_salad: 'Salatlar',
    cat_drink: 'Ichimliklar',
    menu_board: 'Menyu doskasi',
    menu_board_text: 'Minimalistik, zamonaviy doska – mavsumiy maxsus takliflar aks etadi.',
    gallery_kicker: "Detallarda go'zallik",
    gallery_title: 'Aurora muhitidan lavhalar.',
    gallery_1: 'Imzoli pour-over',
    gallery_2: "Kafe ichki ko'rinishi",
    gallery_3: 'Bar ortida barista',
    gallery_4: 'Desertlar tanlovi',
    reviews_kicker: 'Mehmonlar fikri',
    reviews_title: 'Biz haqimizda izohlar.',
    review_1_text: '"Shahardagi eng mazali qahva! Ajoyib muhit."',
    review_1_author: '— Alex',
    review_2_text: '"Juda chiroyli joy va nihoyatda mazali desertlar."',
    review_2_author: '— Sarah',
    review_3_text: '"Shahar shovqinidan qochish uchun eng qulay maskan, espressosi ajoyib."',
    review_3_author: '— Daniel',
    location_kicker: 'Bizga tashrif buyuring',
    location_title: "Taste of Uzbekistan'ni toping.",
    location_p: "Aurora tumanining yuragida joylashgan qahvaxonamiz markaziy bekatdan bir necha daqiqalik piyoda yo'l.",
    location_addr: 'Manzil',
    location_hours: 'Ish vaqti',
    location_hours_val: 'Har kuni ochiq',
    contact_kicker: 'Buyurtmalar uchun aloqa',
    contact_title: 'Telefon yoki messenjer orqali buyurtma bering.',
    contact_p: "Taom buyurtma qilish uchun bizga qo'ng'iroq qiling yoki WhatsApp va Telegram orqali yozing. Operatorlarimiz sizga menyudan tanlashda yordam beradi va yetkazib berishni tasdiqlaydi.",
    contact_phone: 'Telefon',
    contact_btn_call: "Qo'ng'iroq qilish",
    contact_btn_wa: 'WhatsApp orqali yozish',
    contact_delivery: "Yetkazib berish: 30–45 daqiqa ichida, shahar bo'ylab. $20 dan yuqori buyurtmalar uchun yetkazib berish bepul.",
    footer_tagline: "Har bir detali e'tibor bilan yaratilgan zamonaviy, nafis qahvaxona.",
    footer_contact: 'Aloqa',
    footer_copyright: 'Taste of Uzbekistan. Barcha huquqlar himoyalangan.',
    aria_theme: 'Tun/kun rejimi',
    map_title: 'Taste of Uzbekistan manzil'
  },
  ru: {
    nav_home: 'Главная',
    nav_about: 'О нас',
    nav_features: 'Преимущества',
    nav_menu: 'Меню',
    nav_gallery: 'Галерея',
    nav_reviews: 'Отзывы',
    nav_location: 'Адрес',
    nav_admin: 'Админ',
    brand_subtitle: 'Национальная кухня',
    footer_brand_title: 'Taste of Uzbekistan',
    footer_brand_subtitle: 'Национальная кухня',
    hero_kicker: 'Премиальная национальная кухня',
    hero_title_accent: 'Настоящие национальные блюда.',
    hero_title_rest: 'Прямо к вам домой.',
    hero_subtitle: 'Taste of Uzbekistan доставляет плов, лагман, манты и другие любимые блюда — современно и удобно.',
    hero_cta_order: 'Заказать блюда',
    hero_cta_menu: 'Смотреть меню',
    hero_meta_hours: 'Открыто ежедневно',
    hero_meta_address: 'Адрес',
    hero_meta_address_val: 'Район Aurora, центр',
    orbit_1_label: 'Национальные блюда',
    orbit_1_sub: 'Плов, лагман, манты',
    orbit_2_label: 'Настоящий вкус',
    orbit_2_sub: 'Традиционные рецепты',
    orbit_3_label: 'Быстрая доставка',
    orbit_3_sub: 'По всему городу',
    about_placeholder: 'Бариста за работой',
    about_kicker: 'Наша история',
    about_title: 'Место для ценителей кофе.',
    about_p1: 'Aurora Coffee House — уютное место с золотым настроением с первой чашки. Мы отбираем зерно с характером с маленьких ферм мира и с вниманием подходим к каждой стадии обжарки и приготовления.',
    about_p2: 'Наша страсть — создавать идеальную чашку кофе из отборных зёрен со всего мира. Заходите, замедлитесь, пусть вас окружают ароматы, музыка и свет.',
    about_stat1: 'Зёрна из стран',
    about_stat2: 'Довольных гостей',
    about_stat3: 'Средний рейтинг',
    features_kicker: 'Taste of Uzbekistan',
    features_title: 'Национальный вкус в каждой ложке.',
    feat1_title: 'Свежеобжаренные зёрна',
    feat1_p: 'Зёрна из проверенных источников, обжаренные малыми партиями с подобранными нашими обжарщиками нотами дегустаций.',
    feat2_title: 'Десерты ручной работы',
    feat2_p: 'Каждое утро на нашей кухне готовят свежую выпечку и кондитерские десерты — идеальное дополнение к кофе.',
    feat3_title: 'Уютная атмосфера',
    feat3_p: 'Мягкий свет, подобранная музыка и места для долгих разговоров.',
    feat4_title: 'Быстрое обслуживание',
    feat4_p: 'Онлайн-заказ и удобный процесс — ваш напиток готов, когда готовы вы.',
    menu_kicker: 'Меню',
    menu_title: 'Настоящие узбекские блюда.',
    cat_plov: 'Плов',
    cat_lagman: 'Лагман',
    cat_manti: 'Манты',
    cat_shashlik: 'Шашлык',
    cat_somsa: 'Самса',
    cat_salad: 'Салаты',
    cat_drink: 'Напитки',
    menu_board: 'Доска меню',
    menu_board_text: 'Минималистичная современная доска — сезонные специальные предложения.',
    gallery_kicker: 'Красота в деталях',
    gallery_title: 'Кадры из мира Aurora.',
    gallery_1: 'Фирменный pour-over',
    gallery_2: 'Интерьер кафе',
    gallery_3: 'Бариста за баром',
    gallery_4: 'Выбор десертов',
    reviews_kicker: 'Мнение гостей',
    reviews_title: 'Отзывы о нас.',
    review_1_text: '"Самый вкусный кофе в городе! Отличная атмосфера."',
    review_1_author: '— Алекс',
    review_2_text: '"Очень уютное место и невероятно вкусные десерты."',
    review_2_author: '— Сара',
    review_3_text: '"Лучшее место, чтобы уйти от городского шума, эспрессо отличный."',
    review_3_author: '— Даниэль',
    location_kicker: 'Посетите нас',
    location_title: 'Как найти Taste of Uzbekistan.',
    location_p: 'Наша кофейня в сердце района Aurora — в нескольких минутах ходьбы от центральной остановки.',
    location_addr: 'Адрес',
    location_hours: 'Режим работы',
    location_hours_val: 'Открыто ежедневно',
    contact_kicker: 'Связь для заказов',
    contact_title: 'Закажите по телефону или в мессенджере.',
    contact_p: 'Чтобы заказать блюда, позвоните нам или напишите в WhatsApp и Telegram. Наши операторы помогут выбрать из меню и подтвердят доставку.',
    contact_phone: 'Телефон',
    contact_btn_call: 'Позвонить',
    contact_btn_wa: 'Написать в WhatsApp',
    contact_delivery: 'Доставка: 30–45 минут по городу. Бесплатно при заказе от $20.',
    footer_tagline: 'Современная изысканная кофейня, созданная с вниманием к каждой детали.',
    footer_contact: 'Контакты',
    footer_copyright: 'Taste of Uzbekistan. Все права защищены.',
    aria_theme: 'Режим день/ночь',
    map_title: 'Адрес Taste of Uzbekistan'
  }
};

const PAGE_TITLE = { uz: 'Taste of Uzbekistan – Milliy taomlar restorani', ru: 'Taste of Uzbekistan – Ресторан национальной кухни' };

function getLang() {
  try {
    const l = localStorage.getItem(LANG_STORAGE_KEY);
    return l === 'ru' ? 'ru' : 'uz';
  } catch {
    return 'uz';
  }
}

function setLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
  }
}

function applyLanguage(lang) {
  const l = lang === 'ru' ? 'ru' : 'uz';
  document.documentElement.lang = l;
  if (PAGE_TITLE[l]) document.title = PAGE_TITLE[l];
  const t = TEXTS[lang] || TEXTS.uz;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key] != null) el.textContent = t[key];
  });
  const locTitle = document.querySelector('#location .section-content:not(#contactSection) .section-title');
  if (locTitle && t.location_title) locTitle.textContent = t.location_title;
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
  const activeCat = document.querySelector('.menu-category.active');
  if (activeCat && activeCat.dataset.category) renderMenu(activeCat.dataset.category);
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn && t.aria_theme) themeBtn.setAttribute('aria-label', t.aria_theme);
  const mapFrame = document.getElementById('mapFrame');
  if (mapFrame && t.map_title) mapFrame.setAttribute('title', t.map_title);
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang === 'ru' ? 'ru' : 'uz';
    setLang(lang);
    applyLanguage(lang);
  });
});

function loadMenuFromStorage() {
  try {
    const raw = localStorage.getItem(MENU_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
  }
  return null;
}

const PRODUCTS = [
  {
    id: 'classic-plov',
    category: 'plov',
    name: 'Klassik Farg‘ona plovi',
    name_ru: 'Классический плов по-фергански',
    price: 9.5,
    description: 'Mol go‘shti, sabzi va ziravorlar bilan tayyorlangan an’anaviy Farg‘ona uslubidagi plov.',
    description_ru: 'Традиционный ферганский плов с говядиной, морковью и специями.',
    badge: 'Uy ta’mi',
    badge_ru: 'Домашний',
    imageUrl: 'https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg'
  },
  {
    id: 'samarkand-plov',
    category: 'plov',
    name: 'Samarqand plovi',
    name_ru: 'Самаркандский плов',
    price: 11.0,
    description: 'Samarqand uslubida tayyorlangan, qalin sabzavot qatlamlari bilan plov.',
    description_ru: 'Самаркандский плов с густым слоем овощей и специй.',
    badge: 'Hududiy taom',
    badge_ru: 'Региональное',
    imageUrl: 'https://images.pexels.com/photos/4109994/pexels-photo-4109994.jpeg'
  },
  {
    id: 'holiday-plov',
    category: 'plov',
    name: 'Bayram plovi',
    name_ru: 'Праздничный плов',
    price: 12.5,
    description: 'Guvalak go‘sht, mayiz va no‘xat bilan boyitilgan bayramona plov.',
    description_ru: 'Праздничный плов с мясом, изюмом и нутом.',
    badge: 'Maxsus',
    badge_ru: 'Особый',
    imageUrl: 'https://images.pexels.com/photos/4109995/pexels-photo-4109995.jpeg'
  },
  {
    id: 'diet-plov',
    category: 'plov',
    name: 'Yengil sabzavotli plov',
    name_ru: 'Лёгкий овощной плов',
    price: 8.5,
    description: 'Sabzavot va tovuq go‘shti bilan tayyorlangan yengil plov varianti.',
    description_ru: 'Лёгкий плов с овощами и курицей.',
    badge: 'Yengil',
    badge_ru: 'Лёгкий',
    imageUrl: 'https://images.pexels.com/photos/4109996/pexels-photo-4109996.jpeg'
  },
  {
    id: 'samsa-plov',
    category: 'plov',
    name: 'Qo‘y go‘shtli plov',
    name_ru: 'Плов с бараниной',
    price: 10.5,
    description: 'Qo‘y go‘shti va karamellashgan sabzilar bilan boyitilgan o‘ziga xos plov.',
    description_ru: 'Плов с бараниной и карамелизированной морковью.',
    badge: 'Chef tanlovi',
    badge_ru: 'Выбор шефа',
    imageUrl: 'https://images.pexels.com/photos/5966435/pexels-photo-5966435.jpeg'
  },
  {
    id: 'spicy-lagman',
    category: 'lagman',
    name: 'Achchiq lag‘mon',
    name_ru: 'Острый лагман',
    price: 8.9,
    description: 'Qo‘shimcha achchiq sous va qalampir bilan tayyorlangan lag‘mon.',
    description_ru: 'Лагман с острым соусом и перцем.',
    badge: 'Achchiq',
    badge_ru: 'Острый',
    imageUrl: 'https://images.pexels.com/photos/19273848/pexels-photo-19273848.jpeg'
  },
  {
    id: 'vegetable-lagman',
    category: 'lagman',
    name: 'Sabzavotli lag‘mon',
    name_ru: 'Овощной лагман',
    price: 7.8,
    description: 'Ko‘proq sabzavot qo‘shilgan, yengil va rang-barang lag‘mon.',
    description_ru: 'Лагман с большим количеством овощей.',
    badge: 'Veggie',
    badge_ru: 'Вегетарианский',
    imageUrl: 'https://images.pexels.com/photos/19273849/pexels-photo-19273849.jpeg'
  },
  {
    id: 'home-lagman',
    category: 'lagman',
    name: 'Uy uslubidagi lag‘mon',
    name_ru: 'Домашний лагман',
    price: 8.3,
    description: 'Uy retsepti bo‘yicha tayyorlangan, quyuq sho‘rvaga ega lag‘mon.',
    description_ru: 'Домашний лагман с насыщенным бульоном.',
    badge: 'Uy ta’mi',
    badge_ru: 'Домашний',
    imageUrl: 'https://images.pexels.com/photos/19273850/pexels-photo-19273850.jpeg'
  },
  {
    id: 'toshkent-lagman',
    category: 'lagman',
    name: 'Toshkent lag‘moni',
    name_ru: 'Ташкентский лагман',
    price: 8.0,
    description: 'Qo‘l bilan cho‘zilgan lag‘mon, sabzavotli sho‘rva va mol go‘shti bo‘laklari bilan.',
    description_ru: 'Ручная лапша с овощным бульоном и говядиной.',
    badge: 'Issiq taom',
    badge_ru: 'Горячее',
    imageUrl: 'https://images.pexels.com/photos/6920937/pexels-photo-6920937.jpeg'
  },
  {
    id: 'fried-lagman',
    category: 'lagman',
    name: 'Qovurilgan lag‘mon',
    name_ru: 'Жареный лагман',
    price: 8.5,
    description: 'Sabzavotlar va go‘sht bilan qovurilgan lag‘mon, yengil achchiq sous bilan.',
    description_ru: 'Жареный лагман с овощами и мясом, лёгкий острый соус.',
    badge: 'Qovurilgan',
    badge_ru: 'Жареный',
    imageUrl: 'https://images.pexels.com/photos/19273847/pexels-photo-19273847.jpeg'
  },
  {
    id: 'classic-manti',
    category: 'manti',
    name: 'Klassik manti',
    name_ru: 'Классические манты',
    price: 7.5,
    description: 'Qo‘y go‘shti va piyoz to‘ldirmasidan tayyorlangan bug‘da pishirilgan manti.',
    description_ru: 'Манты на пару с начинкой из баранины и лука.',
    badge: 'An’anaviy',
    badge_ru: 'Традиционные',
    imageUrl: 'https://images.pexels.com/photos/6542792/pexels-photo-6542792.jpeg'
  },
  {
    id: 'pumpkin-manti',
    category: 'manti',
    name: 'Qovoqli manti',
    name_ru: 'Манты с тыквой',
    price: 7.0,
    description: 'Yengil qovoq va ziravorlar bilan to‘ldirilgan vegetarian manti.',
    description_ru: 'Вегетарианские манты с тыквой и специями.',
    badge: 'Veggie',
    badge_ru: 'Вегетарианские',
    imageUrl: 'https://images.pexels.com/photos/6542793/pexels-photo-6542793.jpeg'
  },
  {
    id: 'fried-manti',
    category: 'manti',
    name: 'Qovurilgan manti',
    name_ru: 'Жареные манты',
    price: 7.8,
    description: 'Tashqi tomoni qarsildoq qilib qovurilgan manti.',
    description_ru: 'Жареные манты с хрустящей корочкой.',
    badge: 'Qovurilgan',
    badge_ru: 'Жареные',
    imageUrl: 'https://images.pexels.com/photos/6542796/pexels-photo-6542796.jpeg'
  },
  {
    id: 'cheese-manti',
    category: 'manti',
    name: 'Pishloqli manti',
    name_ru: 'Манты с сыром',
    price: 7.9,
    description: 'Ichiga yumshoq pishloq solingan maxsus manti.',
    description_ru: 'Манты с мягким сыром внутри.',
    badge: 'Maxsus',
    badge_ru: 'Особые',
    imageUrl: 'https://images.pexels.com/photos/6542797/pexels-photo-6542797.jpeg'
  },
  {
    id: 'mix-manti',
    category: 'manti',
    name: 'Manti miksi (asosrti)',
    name_ru: 'Ассорти мантов',
    price: 9.2,
    description: 'Go‘shtli, qovoqli va pishloqli mantilar assortisi.',
    description_ru: 'Ассорти из мясных, тыквенных и сырных мантов.',
    badge: 'Assorti',
    badge_ru: 'Ассорти',
    imageUrl: 'https://images.pexels.com/photos/6542798/pexels-photo-6542798.jpeg'
  },
  {
    id: 'lula-kebab',
    category: 'shashlik',
    name: 'Lyulya shashlik',
    name_ru: 'Люля-кебаб',
    price: 6.5,
    description: 'Qo‘y va mol go‘shtidan tayyorlangan shirador lyulya shashlik, yangi ko‘katlar bilan.',
    description_ru: 'Люля-кебаб из баранины и говядины, свежая зелень.',
    badge: 'Grill',
    badge_ru: 'Гриль',
    imageUrl: 'https://images.pexels.com/photos/4109991/pexels-photo-4109991.jpeg'
  },
  {
    id: 'kebab-mix',
    category: 'shashlik',
    name: 'Shashlik mix',
    name_ru: 'Ассорти шашлыков',
    price: 12.0,
    description: 'Turli xil shashliklar assortisi – ziyofat uchun ideal tanlov.',
    description_ru: 'Ассорти шашлыков — идеально для застолья.',
    badge: 'Assorti',
    badge_ru: 'Ассорти',
    imageUrl: 'https://images.pexels.com/photos/4109993/pexels-photo-4109993.jpeg'
  },
  {
    id: 'chicken-shashlik',
    category: 'shashlik',
    name: 'Tovuq shashlik',
    name_ru: 'Шашлык из курицы',
    price: 6.0,
    description: 'Yengil marinadlangan tovuq go‘shtidan tayyorlangan shashlik.',
    description_ru: 'Шашлык из маринованного куриного мяса.',
    badge: 'Yengil',
    badge_ru: 'Лёгкий',
    imageUrl: 'https://images.pexels.com/photos/4109997/pexels-photo-4109997.jpeg'
  },
  {
    id: 'liver-shashlik',
    category: 'shashlik',
    name: 'Jigar shashlik',
    name_ru: 'Шашлык из печени',
    price: 5.8,
    description: 'Yangi jigar bo‘laklaridan tayyorlangan shiravor shashlik.',
    description_ru: 'Шашлык из свежей печени.',
    badge: 'An’anaviy',
    badge_ru: 'Традиционный',
    imageUrl: 'https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg'
  },
  {
    id: 'vegetable-shashlik',
    category: 'shashlik',
    name: 'Sabzavotli shashlik',
    name_ru: 'Овощной шашлык',
    price: 5.2,
    description: 'Grilda pishirilgan sabzavotlar shashligi.',
    description_ru: 'Шашлык из овощей на гриле.',
    badge: 'Veggie',
    badge_ru: 'Вегетарианский',
    imageUrl: 'https://images.pexels.com/photos/4109999/pexels-photo-4109999.jpeg'
  },
  {
    id: 'classic-somsa',
    category: 'somsa',
    name: 'Qo‘y go‘shtli somsa',
    name_ru: 'Самса с бараниной',
    price: 3.0,
    description: 'Yangi pishirilgan qatlamli somsa – qo‘y go‘shti va piyoz bilan.',
    description_ru: 'Свежая слоёная самса с бараниной и луком.',
    badge: 'Tandir somsa',
    badge_ru: 'Тандырная',
    imageUrl: 'https://images.pexels.com/photos/6542794/pexels-photo-6542794.jpeg'
  },
  {
    id: 'cheese-somsa',
    category: 'somsa',
    name: 'Pishloqli somsa',
    name_ru: 'Самса с сыром',
    price: 2.8,
    description: 'Eritilgan pishloq bilan to‘ldirilgan yengil somsa.',
    description_ru: 'Лёгкая самса с плавленым сыром.',
    badge: 'Yumshoq ta’m',
    badge_ru: 'Нежный вкус',
    imageUrl: 'https://images.pexels.com/photos/6542795/pexels-photo-6542795.jpeg'
  },
  {
    id: 'potato-somsa',
    category: 'somsa',
    name: 'Kartoshkali somsa',
    name_ru: 'Самса с картофелем',
    price: 2.5,
    description: 'Kartoshka va ko‘katlar bilan to‘ldirilgan somsa.',
    description_ru: 'Самса с начинкой из картофеля и зелени.',
    badge: 'Veggie',
    badge_ru: 'Вегетарианская',
    imageUrl: 'https://images.pexels.com/photos/6542799/pexels-photo-6542799.jpeg'
  },
  {
    id: 'mini-somsa',
    category: 'somsa',
    name: 'Mini somsa',
    name_ru: 'Мини-самса',
    price: 3.2,
    description: 'Kichik o‘lchamdagi, qarsildoq qobig‘iga ega somsalar.',
    description_ru: 'Небольшие, хрустящие мини-самсы.',
    badge: 'Snak',
    badge_ru: 'Закуска',
    imageUrl: 'https://images.pexels.com/photos/6542800/pexels-photo-6542800.jpeg'
  },
  {
    id: 'mix-somsa',
    category: 'somsa',
    name: 'Somsa miksi',
    name_ru: 'Ассорти самсы',
    price: 4.5,
    description: 'Go‘shtli, pishloqli va sabzavotli somsalardan assorti.',
    description_ru: 'Ассорти из мясной, сырной и овощной самсы.',
    badge: 'Assorti',
    badge_ru: 'Ассорти',
    imageUrl: 'https://images.pexels.com/photos/6542801/pexels-photo-6542801.jpeg'
  },
  {
    id: 'achik-chuchuk',
    category: 'salad',
    name: 'Achchiq-chuchuk',
    name_ru: 'Ачик-чучук',
    price: 4.0,
    description: 'Pomidor, bodring va piyozdan tayyorlangan klassik o‘zbek salati.',
    description_ru: 'Классический узбекский салат из томатов, огурцов и лука.',
    badge: 'Yangi sabzavotlar',
    badge_ru: 'Свежие овощи',
    imageUrl: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 'fresh-salad',
    category: 'salad',
    name: 'Yangi sabzavotlar salati',
    name_ru: 'Салат из свежих овощей',
    price: 4.5,
    description: 'Sezon sabzavotlari, ko‘kat va yengil limon sousi bilan.',
    description_ru: 'Сезонные овощи, зелень и лёгкий лимонный соус.',
    badge: 'Yengil',
    badge_ru: 'Лёгкий',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    id: 'greek-salad',
    category: 'salad',
    name: 'Gretsiya salati',
    name_ru: 'Греческий салат',
    price: 5.2,
    description: 'Pishloq, zaytun va yangi sabzavotlardan yengil salat.',
    description_ru: 'Лёгкий салат с сыром, оливками и овощами.',
    badge: 'Yengil',
    badge_ru: 'Лёгкий',
    imageUrl: 'https://images.pexels.com/photos/1437268/pexels-photo-1437268.jpeg'
  },
  {
    id: 'vitamin-salad',
    category: 'salad',
    name: 'Vitamin salat',
    name_ru: 'Витаминный салат',
    price: 4.8,
    description: 'Ko‘p ko‘kat, karam va sabzi bilan tayyorlangan vitaminli salat.',
    description_ru: 'Витаминный салат с капустой, морковью и зеленью.',
    badge: 'Sog‘lom',
    badge_ru: 'Полезный',
    imageUrl: 'https://images.pexels.com/photos/1437269/pexels-photo-1437269.jpeg'
  },
  {
    id: 'olivie-salad',
    category: 'salad',
    name: 'Olivye salati',
    name_ru: 'Салат Оливье',
    price: 5.0,
    description: 'Klassik bayramona Olivye salati.',
    description_ru: 'Классический праздничный салат Оливье.',
    badge: 'Bayram',
    badge_ru: 'Праздничный',
    imageUrl: 'https://images.pexels.com/photos/1437270/pexels-photo-1437270.jpeg'
  },
  {
    id: 'green-tea',
    category: 'drink',
    name: 'Ko‘k choy',
    name_ru: 'Зелёный чай',
    price: 2.0,
    description: 'An’anaviy choynakda damlangan o‘zbek ko‘k choyi.',
    description_ru: 'Узбекский зелёный чай, заваренный в традиционном чайнике.',
    badge: 'Issiq ichimlik',
    badge_ru: 'Горячий напиток',
    imageUrl: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg'
  },
  {
    id: 'compote',
    category: 'drink',
    name: 'Mevali kompot',
    name_ru: 'Фруктовый компот',
    price: 2.5,
    description: 'Quritilgan mevalardan tayyorlangan shirin va tetiklashtiruvchi ichimlik.',
    description_ru: 'Сладкий тонизирующий напиток из сухофруктов.',
    badge: 'Sovuq ichimlik',
    badge_ru: 'Холодный напиток',
    imageUrl: 'https://images.pexels.com/photos/5533644/pexels-photo-5533644.jpeg'
  },
  {
    id: 'black-tea',
    category: 'drink',
    name: 'Qora choy',
    name_ru: 'Чёрный чай',
    price: 2.0,
    description: 'Qaynoq qora choy, limon va shakar bilan xizmat qilinadi.',
    description_ru: 'Горячий чёрный чай с лимоном и сахаром.',
    badge: 'Issiq ichimlik',
    badge_ru: 'Горячий напиток',
    imageUrl: 'https://images.pexels.com/photos/1417946/pexels-photo-1417946.jpeg'
  },
  {
    id: 'lemonade',
    category: 'drink',
    name: 'Uy limonadi',
    name_ru: 'Домашний лимонад',
    price: 3.0,
    description: 'Tabiiy limon sharbati va yalpiz bilan tayyorlangan limonad.',
    description_ru: 'Домашний лимонад с лимоном и мятой.',
    badge: 'Sovuq ichimlik',
    badge_ru: 'Холодный напиток',
    imageUrl: 'https://images.pexels.com/photos/5533645/pexels-photo-5533645.jpeg'
  },
  {
    id: 'cola',
    category: 'drink',
    name: 'Gazli ichimlik (cola)',
    name_ru: 'Газированный напиток (кола)',
    price: 2.2,
    description: 'Shishadagi sovutilgan gazli ichimlik.',
    description_ru: 'Охлаждённый газированный напиток в бутылке.',
    badge: 'Klassik',
    badge_ru: 'Классика',
    imageUrl: 'https://images.pexels.com/photos/5533646/pexels-photo-5533646.jpeg'
  }
];

const storedMenu = loadMenuFromStorage();
if (storedMenu && Array.isArray(storedMenu) && storedMenu.length > 0) {
  PRODUCTS.length = 0;
  storedMenu.forEach((item) => PRODUCTS.push(item));
}

function saveTheme(theme) {
  try {
    localStorage.setItem('aurora-theme', theme);
  } catch {
  }
}

function loadTheme() {
  try {
    return localStorage.getItem('aurora-theme');
  } catch {
    return null;
  }
}

function applyStoredTheme() {
  const stored = loadTheme();
  if (stored === 'dark' || stored === 'light') {
    body.setAttribute('data-theme', stored);
  }
}

applyStoredTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    saveTheme(next);
  });
}

function renderMenu(category) {
  const menuContainer = document.getElementById('menuItems');
  if (!menuContainer) return;

  const items = PRODUCTS.filter((p) => p && p.category === category);

  menuContainer.innerHTML = '';

  const lang = getLang();
  items.forEach((item) => {
    const itemName = (lang === 'ru' && item.name_ru) ? item.name_ru : (item.name || '');
    const itemDesc = (lang === 'ru' && item.description_ru) ? item.description_ru : (item.description || '');
    const itemBadge = (lang === 'ru' && item.badge_ru) ? item.badge_ru : (item.badge || '');

    const card = document.createElement('article');
    card.className = 'menu-card reveal';
    if (item.id) card.dataset.productId = item.id;

    const image = document.createElement('div');
    image.className = 'menu-image';
    if (item.imageUrl) {
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = itemName || 'Taom rasmi';
      img.className = 'menu-image-img';
      image.appendChild(img);
      if (itemBadge) {
        const label = document.createElement('span');
        label.className = 'menu-image-badge';
        label.textContent = itemBadge;
        image.appendChild(label);
      }
    } else if (itemBadge) {
      image.textContent = itemBadge;
    }

    const info = document.createElement('div');

    const titleRow = document.createElement('div');
    titleRow.className = 'menu-info-title-row';

    const name = document.createElement('h3');
    name.className = 'menu-name';
    name.textContent = itemName;

    const price = document.createElement('span');
    price.className = 'menu-price';
    const priceVal = Number(item.price);
    price.textContent = `$${Number.isFinite(priceVal) ? priceVal.toFixed(2) : '0.00'}`;

    titleRow.appendChild(name);
    titleRow.appendChild(price);

    const desc = document.createElement('p');
    desc.className = 'menu-desc';
    desc.textContent = itemDesc;

    const rating = document.createElement('div');
    rating.className = 'menu-rating';
    rating.textContent = '★★★★★';

    info.appendChild(titleRow);
    info.appendChild(desc);
    info.appendChild(rating);

    card.appendChild(image);
    card.appendChild(info);

    menuContainer.appendChild(card);
  });

  revealOnScroll(true);
}

const categoryButtons = document.querySelectorAll('.menu-category');
categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    if (!category) return;

    categoryButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    renderMenu(category);
  });
});

renderMenu('plov');
applyLanguage(getLang());

function revealOnScroll(force) {
  const elements = document.querySelectorAll('.reveal');

  if (force) {
    elements.forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  elements.forEach((el) => observer.observe(el));
}

revealOnScroll(false);

function openMobileMenu() {
  const overlay = document.getElementById('mobileNavOverlay');
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('menuToggle');
  if (overlay && nav && btn) {
    overlay.classList.add('is-open');
    nav.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const overlay = document.getElementById('mobileNavOverlay');
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('menuToggle');
  if (overlay && nav && btn) {
    overlay.classList.remove('is-open');
    nav.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }
}

const menuToggle = document.getElementById('menuToggle');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav && mobileNav.classList.contains('is-open');
    if (isOpen) closeMobileMenu();
    else openMobileMenu();
  });
}
if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener('click', closeMobileMenu);
}
if (mobileNav) {
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
    closeMobileMenu();
  }
});

window.addEventListener('load', () => {
  body.classList.remove('loading');
});

body.classList.add('loading');

