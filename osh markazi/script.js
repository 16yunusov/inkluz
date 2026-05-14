document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- STATE MANAGEMENT ---
    let allProducts = [];
    let cart = [];

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const toggleTheme = () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if (isDark) body.removeAttribute('data-theme');
        else body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        lucide.createIcons();
    };
    themeToggle.addEventListener('click', toggleTheme);
    if (localStorage.getItem('theme') === 'dark') body.setAttribute('data-theme', 'dark');

    // --- MOBILE MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        lucide.createIcons();
    });

    // --- PRODUCT LOADING ---
    async function loadProducts() {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            allProducts = data.data;
            renderProducts(allProducts);
        } catch (error) {
            console.error('Xatolik:', error);
        }
    }

    function renderProducts(products) {
        const menuGrid = document.getElementById('menu-grid');
        menuGrid.innerHTML = products.map(p => `
            <div class="menu-card" data-category="${p.kategoriya}">
                <div class="card-img"><img src="${p.rasm}" alt="${p.nomi}"></div>
                <div class="card-info">
                    <h3>${p.nomi}</h3>
                    <p>${p.description || ''}</p>
                    <div class="card-footer">
                        <span class="price">${p.narxi.toLocaleString()} so'm</span>
                        <div class="quantity-control">
                            <button class="q-btn" onclick="changeQty(${p.id}, -1)">-</button>
                            <span class="q-count" id="qty-${p.id}">1</span>
                            <button class="q-btn" onclick="changeQty(${p.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="btn btn-primary full-width" onclick="addItemToCart(${p.id})">Savatga qo'shish</button>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    }

    // --- CART LOGIC ---
    window.changeQty = (id, delta) => {
        const el = document.getElementById(`qty-${id}`);
        let current = parseInt(el.textContent);
        current = Math.max(1, current + delta);
        el.textContent = current;
    };

    window.addItemToCart = (id) => {
        const product = allProducts.find(p => p.id === id);
        const qty = parseInt(document.getElementById(`qty-${id}`).textContent);
        
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({ ...product, quantity: qty });
        }
        
        updateCartUI();
        showToast(`✅ ${product.nomi} savatga qo'shildi`);
    };

    function updateCartUI() {
        const container = document.getElementById('cart-items-container');
        const badge = document.getElementById('cart-count-badge');
        const totalEl = document.getElementById('cart-total-price');
        const summaryTotal = document.getElementById('summary-total');
        const summaryItems = document.getElementById('summary-items');
        const orderSummary = document.getElementById('order-summary');
        const submitBtn = document.getElementById('submit-order-btn');

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align: center; opacity: 0.5; margin-top: 50px;">Savat bo\'sh</p>';
            badge.textContent = '0';
            totalEl.textContent = '0 so\'m';
            orderSummary.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Savat bo\'sh';
            return;
        }

        let total = 0;
        let count = 0;

        container.innerHTML = cart.map(item => {
            total += item.narxi * item.quantity;
            count += item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.rasm}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.nomi}</h4>
                        <p>${item.quantity} x ${item.narxi.toLocaleString()} so'm</p>
                    </div>
                    <button class="icon-btn" onclick="removeFromCart(${item.id})"><i data-lucide="trash-2" style="width: 16px;"></i></button>
                </div>
            `;
        }).join('');

        badge.textContent = count;
        totalEl.textContent = total.toLocaleString() + " so'm";
        
        // Update Checkout Summary
        orderSummary.style.display = 'block';
        summaryTotal.textContent = total.toLocaleString() + " so'm";
        summaryItems.innerHTML = cart.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 5px;">
                <span>${item.nomi} (x${item.quantity})</span>
                <span>${(item.narxi * item.quantity).toLocaleString()} so'm</span>
            </div>
        `).join('');
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Buyurtma berish';
        
        lucide.createIcons();
    }

    window.removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    };

    // --- SIDEBAR UI ---
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    document.getElementById('open-cart').addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });
    document.getElementById('close-cart').addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    window.scrollToCheckout = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.getElementById('delivery').scrollIntoView({ behavior: 'smooth' });
    };

    // --- FORM SUBMISSION ---
    const deliveryForm = document.getElementById('delivery-form');
    deliveryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-order-btn');
        const formData = new FormData(deliveryForm);
        const customerData = Object.fromEntries(formData.entries());

        const orderData = {
            name: customerData.name,
            phone: customerData.phone,
            address: customerData.address,
            comment: customerData.comment,
            items: cart.map(item => ({
                name: item.nomi,
                quantity: item.quantity,
                price: item.narxi,
                rasm: item.rasm
            })),
            totalPrice: cart.reduce((sum, item) => sum + (item.narxi * item.quantity), 0)
        };

        btn.disabled = true;
        btn.textContent = 'Yuborilmoqda...';

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const result = await response.json();
            if (result.success) {
                showToast("✅ " + result.message);
                cart = [];
                updateCartUI();
                deliveryForm.reset();
            }
        } catch (error) {
            showToast("❌ Xatolik yuz berdi");
        } finally {
            btn.disabled = false;
            btn.textContent = 'Buyurtma berish';
        }
    });

    // --- TOAST NOTIFICATION ---
    function showToast(msg) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            background: var(--dark); color: white; padding: 12px 25px; border-radius: 50px;
            z-index: 2000; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: slideUp 0.3s ease;
        `;
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // --- TRACK ORDER ---
    const trackModal = document.getElementById('status-modal');
    const trackBtn = document.getElementById('track-order-btn');
    const closeTrack = document.getElementById('close-status');
    const doTrackBtn = document.getElementById('do-track');
    const trackResult = document.getElementById('track-result');

    trackBtn.addEventListener('click', () => {
        trackModal.style.display = 'flex';
        trackResult.style.display = 'none';
    });
    closeTrack.addEventListener('click', () => trackModal.style.display = 'none');

    doTrackBtn.addEventListener('click', async () => {
        const phone = document.getElementById('track-phone').value.trim();
        if (!phone) return showToast("⚠️ Telefon raqamni kiriting");

        doTrackBtn.disabled = true;
        doTrackBtn.textContent = 'Qidirilmoqda...';

        try {
            const res = await fetch(`http://localhost:5000/api/status/${phone}`);
            const data = await res.json();
            
            trackResult.style.display = 'block';
            if (data.orders && data.orders.length > 0) {
                const latest = data.orders[data.orders.length - 1];
                trackResult.innerHTML = `
                    <div style="background: rgba(0,0,0,0.03); padding: 15px; border-radius: 12px; border-left: 4px solid var(--primary-gold);">
                        <p><b>Buyurtma:</b> #${latest.id}</p>
                        <p><b>Holati:</b> <span class="badge badge-${latest.status}">${getStatusText(latest.status)}</span></p>
                        <p style="font-size: 0.8rem; margin-top: 10px; opacity: 0.7;">${latest.items.length} ta mahsulot • ${latest.totalPrice.toLocaleString()} so'm</p>
                    </div>
                `;
            } else {
                trackResult.innerHTML = '<p style="color: #eb5757; text-align: center;">Buyurtma topilmadi.</p>';
            }
        } catch (error) {
            showToast("❌ Xatolik yuz berdi");
        } finally {
            doTrackBtn.disabled = false;
            doTrackBtn.textContent = 'Tekshirish';
        }
    });

    function getStatusText(status) {
        const map = {
            'pending': 'Kutilmoqda 🟡',
            'accepted': 'Qabul qilindi ✅',
            'ready': 'Tayyorlanmoqda 👨‍🍳',
            'delivering': 'Yetkazilmoqda 🚚',
            'delivered': 'Yetkazildi ✨',
            'rejected': 'Rad etildi ❌'
        };
        return map[status] || status;
    }

    // Initialize
    loadProducts();

    // Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            const filtered = filter === 'all' ? allProducts : allProducts.filter(p => p.kategoriya === filter);
            renderProducts(filtered);
        });
    });
});
