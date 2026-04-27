const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutTotalEl = document.getElementById('checkoutTotal');
const checkoutButton = document.getElementById('checkoutButton');
const checkoutSection = document.getElementById('checkoutSection');
const checkoutForm = document.getElementById('checkoutForm');
const orderConfirmation = document.getElementById('orderConfirmation');
const orderSummaryText = document.getElementById('orderSummaryText');
const newOrderButton = document.getElementById('newOrderButton');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const PRODUCTS = [
  {
    id: 'cappuccino',
    category: 'coffee',
    name: 'Cappuccino',
    price: 4.0,
    description: 'Velvety foam layered over a rich double espresso.',
    badge: 'Classic Signature'
  },
  {
    id: 'latte',
    category: 'coffee',
    name: 'Latte',
    price: 4.5,
    description: 'Silky steamed milk with a light, creamy texture.',
    badge: 'All-Day Favorite'
  },
  {
    id: 'americano',
    category: 'coffee',
    name: 'Americano',
    price: 3.5,
    description: 'Bright, clean espresso balanced with hot water.',
    badge: 'Light & Smooth'
  },
  {
    id: 'espresso-single',
    category: 'espresso',
    name: 'Single Espresso',
    price: 2.8,
    description: 'A concentrated shot of our signature roast.',
    badge: 'Quick Boost'
  },
  {
    id: 'espresso-double',
    category: 'espresso',
    name: 'Double Espresso',
    price: 3.4,
    description: 'Intense and aromatic double shot.',
    badge: 'Barista Choice'
  },
  {
    id: 'flat-white',
    category: 'espresso',
    name: 'Flat White',
    price: 4.2,
    description: 'Smooth espresso with micro-foamed milk.',
    badge: 'Perfect Balance'
  },
  {
    id: 'chocolate-cake',
    category: 'desserts',
    name: 'Chocolate Cake',
    price: 5.0,
    description: 'Dark chocolate sponge with ganache layers.',
    badge: 'Rich & Indulgent'
  },
  {
    id: 'croissant',
    category: 'desserts',
    name: 'Butter Croissant',
    price: 3.0,
    description: 'Flaky, buttery pastry baked fresh each morning.',
    badge: 'Morning Essential'
  },
  {
    id: 'cheesecake',
    category: 'desserts',
    name: 'Vanilla Cheesecake',
    price: 5.5,
    description: 'Creamy cheesecake on a crisp biscuit base.',
    badge: 'Cafe Favorite'
  },
  {
    id: 'avocado-toast',
    category: 'breakfast',
    name: 'Avocado Toast',
    price: 7.5,
    description: 'Sourdough, smashed avocado, lemon, and microgreens.',
    badge: 'Bright Morning'
  },
  {
    id: 'granola-bowl',
    category: 'breakfast',
    name: 'Granola Bowl',
    price: 6.8,
    description: 'Toasted granola, yogurt, seasonal fruits, and honey.',
    badge: 'Light & Fresh'
  },
  {
    id: 'egg-brioche',
    category: 'breakfast',
    name: 'Egg Brioche Roll',
    price: 6.2,
    description: 'Soft brioche with folded eggs and chive butter.',
    badge: 'Comfort Classic'
  }
];

const cart = new Map();

function saveTheme(theme) {
  try {
    localStorage.setItem('aurora-theme', theme);
  } catch {
    /* ignore */
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

  const items = PRODUCTS.filter((p) => p.category === category);

  menuContainer.innerHTML = '';

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'menu-card reveal';
    card.dataset.productId = item.id;

    const image = document.createElement('div');
    image.className = 'menu-image';
    image.textContent = item.badge;

    const info = document.createElement('div');

    const titleRow = document.createElement('div');
    titleRow.className = 'menu-info-title-row';

    const name = document.createElement('h3');
    name.className = 'menu-name';
    name.textContent = item.name;

    const price = document.createElement('span');
    price.className = 'menu-price';
    price.textContent = `$${item.price.toFixed(2)}`;

    titleRow.appendChild(name);
    titleRow.appendChild(price);

    const desc = document.createElement('p');
    desc.className = 'menu-desc';
    desc.textContent = item.description;

    const actions = document.createElement('div');
    actions.className = 'menu-actions';

    const quantity = document.createElement('div');
    quantity.className = 'quantity-selector';
    quantity.innerHTML = `
      <button type="button" data-action="dec">–</button>
      <span data-role="value">1</span>
      <button type="button" data-action="inc">+</button>
    `;

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn btn-primary';
    addBtn.textContent = 'Add to Cart';

    actions.appendChild(quantity);
    actions.appendChild(addBtn);

    info.appendChild(titleRow);
    info.appendChild(desc);
    info.appendChild(actions);

    card.appendChild(image);
    card.appendChild(info);

    menuContainer.appendChild(card);
  });

  setupMenuInteractions();
  revealOnScroll(true);
}

function setupMenuInteractions() {
  const menuContainer = document.getElementById('menuItems');
  if (!menuContainer) return;

  menuContainer.querySelectorAll('.menu-card').forEach((card) => {
    const quantity = card.querySelector('.quantity-selector');
    const valueSpan = quantity.querySelector('[data-role="value"]');
    const decBtn = quantity.querySelector('[data-action="dec"]');
    const incBtn = quantity.querySelector('[data-action="inc"]');
    const addBtn = card.querySelector('.btn-primary');
    const id = card.dataset.productId;

    let value = 1;

    const updateValue = (next) => {
      value = Math.max(1, next);
      valueSpan.textContent = String(value);
    };

    decBtn.addEventListener('click', () => {
      updateValue(value - 1);
    });

    incBtn.addEventListener('click', () => {
      updateValue(value + 1);
    });

    addBtn.addEventListener('click', () => {
      if (!id) return;
      addToCart(id, value);
      openCart();
    });
  });
}

function addToCart(productId, quantity) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.get(productId) || { product, quantity: 0 };
  existing.quantity += quantity;
  cart.set(productId, existing);
  renderCart();
}

function updateCartItem(productId, quantity) {
  const existing = cart.get(productId);
  if (!existing) return;
  if (quantity <= 0) {
    cart.delete(productId);
  } else {
    existing.quantity = quantity;
    cart.set(productId, existing);
  }
  renderCart();
}

function renderCart() {
  let count = 0;
  let total = 0;
  cartItemsEl.innerHTML = '';

  cart.forEach(({ product, quantity }) => {
    count += quantity;
    total += product.price * quantity;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.dataset.productId = product.id;

    const name = document.createElement('div');
    name.className = 'cart-item-name';
    name.textContent = product.name;

    const meta = document.createElement('div');
    meta.className = 'cart-item-meta';
    meta.textContent = `$${product.price.toFixed(2)} · ${quantity}x`;

    const left = document.createElement('div');
    left.appendChild(name);
    left.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'cart-item-actions';
    actions.innerHTML = `
      <button type="button" class="icon-button" data-action="dec">–</button>
      <span>${quantity}</span>
      <button type="button" class="icon-button" data-action="inc">+</button>
    `;

    row.appendChild(left);
    row.appendChild(actions);

    cartItemsEl.appendChild(row);
  });

  cartCountEl.textContent = String(count);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
  checkoutTotalEl.textContent = `$${total.toFixed(2)}`;
}

if (cartItemsEl) {
  cartItemsEl.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    if (!action) return;

    const row = target.closest('.cart-item');
    if (!row) return;
    const id = row.dataset.productId;
    if (!id) return;

    const entry = cart.get(id);
    if (!entry) return;

    if (action === 'dec') {
      updateCartItem(id, entry.quantity - 1);
    } else if (action === 'inc') {
      updateCartItem(id, entry.quantity + 1);
    }
  });
}

function openCart() {
  if (!cartSidebar) return;
  cartSidebar.classList.add('open');
}

function closeCartSidebar() {
  if (!cartSidebar) return;
  cartSidebar.classList.remove('open');
}

if (cartButton) {
  cartButton.addEventListener('click', () => {
    if (cartSidebar.classList.contains('open')) {
      closeCartSidebar();
    } else {
      openCart();
    }
  });
}

if (closeCart) {
  closeCart.addEventListener('click', () => {
    closeCartSidebar();
  });
}

if (checkoutButton && checkoutSection) {
  checkoutButton.addEventListener('click', () => {
    checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (cart.size === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    const formData = new FormData(checkoutForm);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const address = formData.get('address') || '';
    const payment = formData.get('payment') || '';

    let itemSummary = '';
    let total = 0;
    cart.forEach(({ product, quantity }) => {
      total += product.price * quantity;
      itemSummary += `${product.name} (${quantity}x), `;
    });
    itemSummary = itemSummary.replace(/, $/, '');

    orderSummaryText.textContent = `Order for ${name} (${phone}), to ${address}. Items: ${itemSummary}. Payment method: ${String(
      payment
    ).toUpperCase()}. Total: $${total.toFixed(2)}.`;

    checkoutForm.reset();
    cart.clear();
    renderCart();
    showOrderConfirmation();
  });
}

function showOrderConfirmation() {
  if (!orderConfirmation) return;
  orderConfirmation.classList.add('show');
  orderConfirmation.setAttribute('aria-hidden', 'false');
}

if (newOrderButton && orderConfirmation) {
  newOrderButton.addEventListener('click', () => {
    orderConfirmation.classList.remove('show');
    orderConfirmation.setAttribute('aria-hidden', 'true');
  });
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

renderMenu('coffee');

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

window.addEventListener('load', () => {
  body.classList.remove('loading');
});

body.classList.add('loading');

