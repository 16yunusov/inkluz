// Mutaxasis ishchilar — Auth va API sinxronlash

import { getCurrentUser, checkBackend, getCartFromApi, getFavoritesFromApi, getOrdersFromApi, addToCartApi, removeFromCartApi, updateCartQuantityApi, clearCartApi, addFavoriteApi, removeFavoriteApi, createOrderApi } from './api.js';
import { cart, setCart, saveCart, setFavorites, saveFavorites, setOrders, saveOrders } from './storage.js';
import { getAllProducts } from './products.js';

let backendAvailable = false;

export async function initBackendCheck() {
  backendAvailable = await checkBackend();
  return backendAvailable;
}

export function isBackendAvailable() {
  return backendAvailable;
}

// Login dan keyin ma'lumotlarni API dan yuklash
export async function syncFromApiOnLogin() {
  const user = getCurrentUser();
  if (!user || !user.id) return;
  try {
    if (await checkBackend()) {
      backendAvailable = true;
      const [apiCart, apiFavorites, apiOrders] = await Promise.all([
        getCartFromApi(user.id).catch(() => []),
        getFavoritesFromApi(user.id).catch(() => []),
        getOrdersFromApi(user.id).catch(() => [])
      ]);
      // API dan kelgan ma'lumotlarni localStorage ga yozish
      if (apiCart && apiCart.length) {
        setCart(apiCart);
        saveCart();
      }
      if (apiFavorites && apiFavorites.length) {
        setFavorites(apiFavorites);
        saveFavorites();
      }
      if (apiOrders && apiOrders.length) {
        const existing = JSON.parse(localStorage.getItem('uzum_orders') || '[]');
        const merged = [...apiOrders, ...existing.filter(o => !apiOrders.find(a => a.orderId === o.orderId))];
        setOrders(merged);
        saveOrders();
      }
      window.dispatchEvent(new CustomEvent('uzum:cart-changed'));
    }
  } catch (e) {
    console.warn('API sync xato:', e);
  }
}

// Savat qo'shish — API ga yuborish
export async function syncCartAddToApi(productId, quantity, price, productData) {
  const user = getCurrentUser();
  if (!user?.id || !backendAvailable) return;
  try {
    await addToCartApi(user.id, productId, quantity, price, productData);
  } catch (e) {
    console.warn('Cart add sync xato:', e);
  }
}

// Savatdan o'chirish — API ga yuborish
export async function syncCartRemoveFromApi(productId) {
  const user = getCurrentUser();
  if (!user?.id || !backendAvailable) return;
  try {
    await removeFromCartApi(user.id, productId);
  } catch (e) {
    console.warn('Cart remove sync xato:', e);
  }
}

// Savat miqdori — API ga yuborish
export async function syncCartQuantityToApi(productId, quantity) {
  const user = getCurrentUser();
  if (!user?.id || !backendAvailable) return;
  try {
    await updateCartQuantityApi(user.id, productId, quantity);
  } catch (e) {
    console.warn('Cart quantity sync xato:', e);
  }
}

// Savatni tozalash — API ga yuborish
export async function syncCartClearToApi() {
  const user = getCurrentUser();
  if (!user?.id || !backendAvailable) return;
  try {
    await clearCartApi(user.id);
  } catch (e) {
    console.warn('Cart clear sync xato:', e);
  }
}

// Sevimli qo'shish — API ga yuborish
export async function syncFavoriteAddToApi(productId) {
  const user = getCurrentUser();
  if (!user?.id || !backendAvailable) return;
  try {
    await addFavoriteApi(user.id, String(productId));
  } catch (e) {
    console.warn('Favorite add sync xato:', e);
  }
}

// Sevimlidan o'chirish — API ga yuborish
export async function syncFavoriteRemoveFromApi(productId) {
  const user = getCurrentUser();
  if (!user?.id || !backendAvailable) return;
  try {
    await removeFavoriteApi(user.id, String(productId));
  } catch (e) {
    console.warn('Favorite remove sync xato:', e);
  }
}

// Buyurtmani API ga yuborish
export async function syncOrderToApi(orderData) {
  const user = getCurrentUser();
  if (!user?.id || !backendAvailable) return;
  try {
    await createOrderApi({
      userId: user.id,
      orderId: orderData.orderId,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      paymentType: orderData.paymentType,
      nasiyaMonths: orderData.nasiyaMonths,
      pochtaId: orderData.pochtaId,
      viloyat: orderData.viloyat,
      tuman: orderData.tuman,
      pochtaJoyi: orderData.pochtaJoyi,
      deliveryPoint: orderData.deliveryPoint
    });
  } catch (e) {
    console.warn('Order sync xato:', e);
  }
}
