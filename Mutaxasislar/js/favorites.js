// Mutaxasis ishchilar — Sevimlilar

import { favorites, saveFavorites } from './storage.js';
import { syncFavoriteAddToApi, syncFavoriteRemoveFromApi } from './auth-sync.js';

export function isFavorite(productId) {
    return favorites.some(f => f == productId);
}

export function toggleFavorite(productId) {
    const id = parseInt(productId) || productId;
    const idx = favorites.findIndex(f => f == id);
    if (idx >= 0) {
        favorites.splice(idx, 1);
        saveFavorites();
        syncFavoriteRemoveFromApi(productId);
    } else {
        favorites.push(id);
        saveFavorites();
        syncFavoriteAddToApi(productId);
    }
}
