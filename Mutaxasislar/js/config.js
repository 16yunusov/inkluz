// Mutaxasis ishchilar — Ma'lumotlar va konstantalar

export const regions = [
    'Toshkent', 'Andijon', 'Buxoro', "Farg'ona", 'Jizzax', 'Xorazm',
    'Namangan', 'Navoiy', "Qashqadaryo", 'Samarqand', 'Sirdaryo', "Surxondaryo"
];

export const regionToId = {
    'Toshkent': 'toshkent', 'Andijon': 'andijon', 'Buxoro': 'buxoro',
    "Farg'ona": 'fargona', 'Jizzax': 'jizzax', 'Xorazm': 'xorazm',
    'Namangan': 'namangan', 'Navoiy': 'navoiy', "Qashqadaryo": 'qashqadaryo',
    'Samarqand': 'samarqand', 'Sirdaryo': 'sirdaryo', 'Surxondaryo': 'surxondaryo'
};

export const jamiykiyPochtalar = [
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

export const viloyatTumanlari = {
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

export const catalogCategories = [
    { id: 'kulolchilik', name: 'Kulolchilik', sub: 'Sopol buyumlar', icon: '🏺', color: '#7c3aed' },
    { id: 'naqsh', name: 'Naqsh va tikuvchilik', sub: 'Suzani, gilam', icon: '🧵', color: '#ec4899' },
    { id: 'duradgorlik', name: 'Duradgorlik', sub: 'Yog\'och buyumlar', icon: '🪚', color: '#8b4513' },
    { id: 'zargarlik', name: 'Zargarlik', sub: 'Zargarlik buyumlari', icon: '💎', color: '#eab308' },
    { id: 'teri', name: 'Teri ishlari', sub: 'Charm buyumlar', icon: '👜', color: '#64748b' },
    { id: 'qolda', name: "Qo'lda buyumlar", sub: 'Badiiy hunar', icon: '✋', color: '#22c55e' },
    { id: 'metall', name: 'Metall ishlari', sub: 'Temir, mis', icon: '⚒️', color: '#64748b' },
    { id: 'tikuvchilik', name: 'Tikuvchilik', sub: 'Kiyim-bosh', icon: '👕', color: '#3b82f6' },
    { id: 'gilam', name: 'Gilam va to\'qimachilik', sub: 'Gilam, palos', icon: '🧶', color: '#f97316' },
    { id: 'badiiy', name: 'Badiiy buyumlar', sub: 'Rasmlar, haykallar', icon: '🎨', color: '#7c3aed' },
    { id: 'mashina', name: 'Mashina sozlik', sub: 'Avtomobil sozlamalari', icon: '🚗', color: '#06b6d4' }
];

export const categorySubcategories = {
    kulolchilik: [
        { id: 'idish', name: 'Idish-tovoq' },
        { id: 'haykal', name: 'Haykallar' },
        { id: 'dekor', name: 'Dekorativ' }
    ],
    naqsh: [
        { id: 'suzani', name: 'Suzani' },
        { id: 'gilam', name: 'Gilam' },
        { id: 'palos', name: 'Palos' }
    ],
    duradgorlik: [
        { id: 'mebel', name: 'Mebel' },
        { id: 'suvra', name: 'Suvralar' },
        { id: 'ochoq', name: "O'choq" }
    ],
    zargarlik: [
        { id: 'zargarlik', name: 'Zargarlik' },
        { id: 'bilaguzuk', name: 'Bilaguzuk' },
        { id: 'tilla', name: 'Tilla-kumush' }
    ],
    teri: [
        { id: 'sumka', name: 'Sumkalar' },
        { id: 'kamarband', name: 'Kamarband' },
        { id: 'poyabzal', name: 'Poyabzal' }
    ],
    qolda: [
        { id: 'sovga', name: "Sovg'a" },
        { id: 'bebek', name: 'Bebek' },
        { id: 'dekor', name: 'Dekor' }
    ],
    metall: [
        { id: 'pichoq', name: 'Pichoqlar' },
        { id: 'idish', name: 'Idishlar' },
        { id: 'dekor', name: 'Dekorativ' }
    ],
    tikuvchilik: [
        { id: 'kiyim', name: 'Kiyim' },
        { id: 'boshkiyim', name: 'Bosh kiyim' },
        { id: 'libos', name: 'Liboslar' }
    ],
    gilam: [
        { id: 'gilam', name: 'Gilam' },
        { id: 'palos', name: 'Palos' },
        { id: 'javal', name: 'Javal' }
    ],
    badiiy: [
        { id: 'rasm', name: 'Rasmlar' },
        { id: 'haykal', name: 'Haykallar' },
        { id: 'miniatyura', name: 'Miniatyura' }
    ],
    mashina: [
        { id: 'tuning', name: 'Tuning' },
        { id: 'zapchast', name: 'Ehtiyot qismlar' },
        { id: 'aksesuar', name: 'Aksessuarlar' }
    ]
};

export const colors = ['Qora', 'Oq', 'Kulrang', 'Qizil', 'Ko\'k', 'Yashil', 'Sariq', 'Pushti', 'Jigarrang', 'Oltin', 'Kumush', 'Rangli'];

export const categoryBrands = {
    kulolchilik: ['Rishton', 'G\'ijduvon', 'Boshqa'],
    naqsh: ['Marg\'ilon', 'Buxoro', 'Boshqa'],
    duradgorlik: ['O\'zbekiston', 'Boshqa'],
    zargarlik: ['Toshkent', 'Buxoro', 'Boshqa'],
    teri: ['O\'zbekiston', 'Boshqa'],
    qolda: ['Hunarmand', 'Boshqa'],
    metall: ['Chust', 'Boshqa'],
    tikuvchilik: ['Marg\'ilon', 'Boshqa'],
    gilam: ['Buxoro', 'Samarqand', 'Boshqa'],
    badiiy: ['Hunarmand', 'Boshqa'],
    mashina: ['O\'zbekiston', 'Chet el', 'Boshqa'],
    default: ['Boshqa']
};

export const countries = ['O\'zbekiston', 'Xitoy', 'Janubiy Koreya', 'Yaponiya', 'AQSh', 'Germaniya', 'Turkiya', 'Rossiya'];

export const products = [
    { id: 2, name: "Rishton sopol lagan", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", image2: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400", image3: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", categoryId: 'kulolchilik', subcategoryId: 'idish', phone: "+998 90 123 45 67", ownerName: "Karimjon Rahimov" },
    { id: 3, name: "G'ijduvon sopol ko'za", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400", image2: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", image3: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", categoryId: 'kulolchilik', subcategoryId: 'idish', phone: "+998 91 234 56 78", ownerName: "Dilnoza Yusupova" },
    { id: 4, name: "Suzani 120x180 sm", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", image2: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400", image3: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", categoryId: 'naqsh', subcategoryId: 'suzani', phone: "+998 93 345 67 89", ownerName: "Malika Toshmatova" },
    { id: 5, name: "Buxoro gilam 2x3 m", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400", image2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", image3: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", categoryId: 'naqsh', subcategoryId: 'gilam', phone: "+998 94 456 78 90", ownerName: "Otabek Qodirov" },
    { id: 6, name: "Yog'och suvra (taxta)", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", image2: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400", image3: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", categoryId: 'duradgorlik', subcategoryId: 'suvra', phone: "+998 97 567 89 01", ownerName: "Jasur Bekmurodov" },
    { id: 7, name: "O'choq ustuni yog'och", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400", image2: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", image3: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400", categoryId: 'duradgorlik', subcategoryId: 'ochoq', phone: "+998 90 678 90 12", ownerName: "Sherzod To'rayev" },
    { id: 8, name: "Kumush bilaguzuk", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", image2: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400", image3: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", categoryId: 'zargarlik', subcategoryId: 'bilaguzuk', phone: "+998 91 789 01 23", ownerName: "Aziza Zargarova" },
    { id: 9, name: "Tilla uzuk", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400", image2: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", image3: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", categoryId: 'zargarlik', subcategoryId: 'zargarlik', phone: "+998 93 890 12 34", ownerName: "Farrux Zargarov" },
    { id: 10, name: "Charm sumka qo'lda", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", image2: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=400", image3: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", categoryId: 'teri', subcategoryId: 'sumka', phone: "+998 94 901 23 45", ownerName: "Dilshod Terichi" },
    { id: 11, name: "Charm kamarband", image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=400", image2: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", image3: "https://images.unsplash.com/photo-1597764690529-2962f9c639e1?w=400", categoryId: 'teri', subcategoryId: 'kamarband', phone: "+998 97 012 34 56", ownerName: "Bobur Charmchi" },
    { id: 12, name: "Qo'lda tikilgan bebek", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", image2: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", image3: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400", categoryId: 'qolda', subcategoryId: 'bebek', phone: "+998 90 123 45 68", ownerName: "Gulnora Tikuvchi" },
    { id: 13, name: "Chust pichoq", image: "https://images.unsplash.com/photo-1597764690529-2962f9c639e1?w=400", image2: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", image3: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=400", categoryId: 'metall', subcategoryId: 'pichoq', phone: "+998 91 234 56 79", ownerName: "Rustam Chustlik" },
    { id: 14, name: "Adras libos", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", image2: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400", image3: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", categoryId: 'tikuvchilik', subcategoryId: 'libos', phone: "+998 93 345 67 80", ownerName: "Nilufar Adraschi" },
    { id: 15, name: "Do'ppi qo'lda tikilgan", image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400", image2: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", image3: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400", categoryId: 'tikuvchilik', subcategoryId: 'boshkiyim', phone: "+998 94 456 78 91", ownerName: "Maftuna Do'ppichi" },
    { id: 16, name: "Samarqand palos 1.5x2 m", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400", image2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", image3: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", categoryId: 'gilam', subcategoryId: 'palos', phone: "+998 97 567 89 02", ownerName: "Sardor Gilamchi" },
    { id: 17, name: "Miniatyura rasmi", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400", image2: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", image3: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", categoryId: 'badiiy', subcategoryId: 'miniatyura', phone: "+998 90 678 90 13", ownerName: "Kamola Rassom" }
];
