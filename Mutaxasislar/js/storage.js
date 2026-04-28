// Mutaxasis ishchilar — LocalStorage va state boshqaruvi

const CART_KEY = 'uzum_cart';
const FAVORITES_KEY = 'uzum_favorites';
const ORDERS_KEY = 'uzum_orders';
const MERCHANT_PRODUCTS_KEY = 'uzum_merchant_products';
const ORDER_ID_KEY = 'uzum_order_id_counter';
const ORDER_ITEM_ID_KEY = 'uzum_order_item_id_counter';
const FOLLOWS_KEY = 'mutaxasis_follows';

// State
export let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
export let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
export let orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
export let merchantProducts = JSON.parse(localStorage.getItem(MERCHANT_PRODUCTS_KEY)) || [];

export function getCart() { return cart; }
export function setCart(value) { cart = value; }
export function getFavorites() { return favorites; }
export function setFavorites(value) { favorites = value; }
export function getOrders() { return orders; }
export function setOrders(value) { orders = value; }
export function getMerchantProducts() { return merchantProducts; }
export function setMerchantProducts(value) { merchantProducts = value; }

export function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function saveOrders() {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function saveMerchantProducts() {
    localStorage.setItem(MERCHANT_PRODUCTS_KEY, JSON.stringify(merchantProducts));
}

export function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function generateOrderId() {
    let counter = parseInt(localStorage.getItem(ORDER_ID_KEY), 10) || 0;
    counter += 1;
    localStorage.setItem(ORDER_ID_KEY, String(counter));
    return 'ORD-' + counter;
}

export function generateOrderItemId() {
    let counter = parseInt(localStorage.getItem(ORDER_ITEM_ID_KEY), 10) || 0;
    counter += 1;
    localStorage.setItem(ORDER_ITEM_ID_KEY, String(counter));
    return 'ITM-' + counter;
}

// Orders ni localStorage dan qayta yuklash
export function reloadOrders() {
    orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

// Follow / Obunachi
function getFollows() {
    try {
        const arr = JSON.parse(localStorage.getItem(FOLLOWS_KEY) || '[]');
        return Array.isArray(arr) ? arr.filter(f => f && f.followerId != null && f.followingId != null) : [];
    } catch { return []; }
}
function saveFollows(arr) {
    localStorage.setItem(FOLLOWS_KEY, JSON.stringify(arr));
}

export function followUser(followerId, followingId) {
    if (followerId == null || followingId == null) return;
    const follows = getFollows();
    if (follows.some(f => f && f.followerId == followerId && f.followingId == followingId)) return;
    follows.push({ followerId: Number(followerId), followingId: Number(followingId) });
    saveFollows(follows);
}

export function unfollowUser(followerId, followingId) {
    if (followerId == null || followingId == null) return;
    let follows = getFollows();
    follows = follows.filter(f => !(f && f.followerId == followerId && f.followingId == followingId));
    saveFollows(follows);
}

export function getFollowersCount(userId) {
    return getFollows().filter(f => f && f.followingId == userId).length;
}

export function getFollowingCount(userId) {
    return getFollows().filter(f => f && f.followerId == userId).length;
}

export function isFollowing(followerId, followingId) {
    if (followerId == null || followingId == null) return false;
    return getFollows().some(f => f && f.followerId == followerId && f.followingId == followingId);
}
