// Mutaxasis ishchilar — Savat operatsiyalari

import { jamiykiyPochtalar, regionToId } from './config.js';
import { formatPrice, escapeHtml } from './utils.js';
import { cart, setCart, saveCart, generateOrderId, generateOrderItemId } from './storage.js';
import { getAllProducts } from './products.js';
import { syncCartAddToApi, syncCartRemoveFromApi, syncCartQuantityToApi, syncCartClearToApi } from './auth-sync.js';

export function addToCart(productId, priceOverride) {
    const product = getAllProducts().find(p => p.id == productId);
    if (!product) return;
    const existing = cart.find(item => item.id == productId);
    const price = priceOverride != null ? priceOverride : (product.price ?? 0);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, price, quantity: 1 });
    saveCart();
    updateCartUI();
    window.dispatchEvent(new CustomEvent('uzum:cart-changed'));
    syncCartAddToApi(productId, 1, price, { name: product.name, image: product.image, phone: product.phone, ownerName: product.ownerName });
}

export function removeFromCart(productId) {
    setCart(cart.filter(item => item.id != productId));
    saveCart();
    updateCartUI();
    window.dispatchEvent(new CustomEvent('uzum:cart-changed'));
    syncCartRemoveFromApi(productId);
}

export function changeCartQuantity(productId, delta) {
    const item = cart.find(i => i.id == productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) { removeFromCart(productId); return; }
    item.quantity = newQty;
    saveCart();
    updateCartUI();
    window.dispatchEvent(new CustomEvent('uzum:cart-changed'));
    syncCartQuantityToApi(productId, newQty);
}

export function updateCartPochtaSelect() {
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

export function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);

    const bottomCartCount = document.getElementById('bottomCartCount');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');

    if (bottomCartCount) {
        bottomCartCount.textContent = totalItems;
        bottomCartCount.style.display = totalItems ? 'flex' : 'none';
    }

    if (!cartItems) return;

    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        cartItems.innerHTML = '<p class="cart-empty">Savat bo\'sh</p>';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';

        cartItems.innerHTML = cart.map(item => {
            const imgUrl = escapeHtml(item.image || (item.images && item.images[0]) || '');
            const priceText = (item.price && item.price > 0) ? formatPrice(item.price) : 'Bog\'lanish';
            const safeName = escapeHtml(item.name || '');
            const safeOwner = item.ownerName ? escapeHtml(item.ownerName) : '';
            const safePhone = item.phone ? String(item.phone).replace(/\s/g, '') : '';
            return `
            <div class="cart-item">
                <img src="${imgUrl}" alt="${safeName}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${safeName}</div>
                    ${safeOwner ? `<div class="cart-item-owner">${safeOwner}</div>` : ''}
                    ${safePhone ? `<a href="tel:${safePhone}" class="cart-item-phone">📞 ${escapeHtml(item.phone)}</a>` : ''}
                    <div class="cart-item-meta">
                        <span class="cart-item-price">${priceText}</span>
                        <span class="cart-item-qty">× ${item.quantity}</span>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">✕</button>
            </div>
        `;
        }).join('');

        cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
        });
    }
}

export function openCart() {
    document.getElementById('cartSidebar')?.classList.add('active');
    document.getElementById('cartOverlay')?.classList.add('active');
}

export function getCartForCheckout() {
    return cart;
}

export function clearCart() {
    setCart([]);
    saveCart();
    syncCartClearToApi();
}

export { generateOrderId, generateOrderItemId };
