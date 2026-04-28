// Mutaxasis ishchilar — Yordamchi funksiyalar

/** XSS oldini olish — HTML maxsus belgilarni escape qilish */
export function escapeHtml(str) {
    if (str == null) return '';
    const s = String(str);
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function formatPrice(price) {
    const n = Number(price);
    if (isNaN(n) || n < 0) return "0 so'm";
    return new Intl.NumberFormat('uz-UZ').format(n) + " so'm";
}

export function getProductImages(product) {
    if (!product) return [];
    let imgs = [];
    if (product.images && Array.isArray(product.images) && product.images.length) {
        imgs = product.images.filter(u => u && String(u).trim()).slice(0, 3);
    } else {
        imgs = [product.image, product.image2, product.image3].filter(u => u && String(u).trim()).slice(0, 3);
    }
    while (imgs.length < 3 && imgs[0]) imgs.push(imgs[0]);
    return imgs;
}
