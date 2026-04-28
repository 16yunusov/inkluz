// Mutaxasis ishchilar — Buyurtmalar

import { jamiykiyPochtalar } from './config.js';
import { orders, setOrders, saveOrders, reloadOrders } from './storage.js';
import { formatPrice } from './utils.js';

export function getOrders() {
    reloadOrders();
    return orders;
}

export function addOrder(orderData) {
    orders.unshift(orderData);
    saveOrders();
}
