const MENU_STORAGE_KEY = 'taste_menu';

function loadMenu() {
  try {
    const raw = localStorage.getItem(MENU_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
  }
  return [];
}

function saveMenu(menu) {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
  } catch {
  }
}

function renderAdminMenu() {
  const container = document.getElementById('adminMenuList');
  if (!container) return;

  const menu = loadMenu();
  container.innerHTML = '';

  if (menu.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'section-text';
    empty.textContent = 'Hozircha menyu bo‘sh. Chap tomondagi forma orqali taom qo‘shing.';
    container.appendChild(empty);
    return;
  }

  menu.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'menu-card reveal visible';

    const image = document.createElement('div');
    image.className = 'menu-image';
    if (item.imageUrl) {
      image.style.backgroundImage = `url(${item.imageUrl})`;
      image.style.backgroundSize = 'cover';
      image.style.backgroundPosition = 'center';
    }

    const info = document.createElement('div');

    const titleRow = document.createElement('div');
    titleRow.className = 'menu-info-title-row';

    const name = document.createElement('h3');
    name.className = 'menu-name';
    name.textContent = item.name || '';

    const price = document.createElement('span');
    price.className = 'menu-price';
    const priceVal = Number(item.price);
    price.textContent = `$${Number.isFinite(priceVal) ? priceVal.toFixed(2) : '0.00'}`;

    titleRow.appendChild(name);
    titleRow.appendChild(price);

    const meta = document.createElement('p');
    meta.className = 'menu-desc';
    meta.textContent = item.description || '';

    const actions = document.createElement('div');
    actions.className = 'menu-actions admin-card-actions';

    const categoryLabel = document.createElement('span');
    categoryLabel.className = 'admin-card-category';
    categoryLabel.textContent = item.category || '';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-delete';
    deleteBtn.setAttribute('aria-label', "Taomni o'chirish");
    deleteBtn.innerHTML = '<span class="btn-delete-icon" aria-hidden="true">×</span> O‘chirish';
    deleteBtn.addEventListener('click', () => {
      const current = loadMenu();
      current.splice(index, 1);
      saveMenu(current);
      renderAdminMenu();
    });

    actions.appendChild(categoryLabel);
    actions.appendChild(deleteBtn);

    info.appendChild(titleRow);
    info.appendChild(meta);
    info.appendChild(actions);

    card.appendChild(image);
    card.appendChild(info);

    container.appendChild(card);
  });
}

const adminForm = document.getElementById('adminForm');

if (adminForm) {
  adminForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const category = document.getElementById('adminCategory').value;
    const name = document.getElementById('adminName').value.trim();
    const price = parseFloat(document.getElementById('adminPrice').value);
    const badge = document.getElementById('adminBadge').value.trim();
    const description = document.getElementById('adminDescription').value.trim();
    const imageUrl = document.getElementById('adminImage').value.trim();

    if (!name || !description || !Number.isFinite(price) || price < 0) {
      alert('Iltimos, barcha majburiy maydonlarni to‘ldiring va narxni to‘g‘ri kiriting.');
      return;
    }

    const menu = loadMenu();
    const newItem = {
      id: `${category}-${Date.now()}`,
      category,
      name,
      price,
      description,
      badge,
      imageUrl
    };

    menu.push(newItem);
    saveMenu(menu);

    adminForm.reset();
    renderAdminMenu();
  });
}

renderAdminMenu();

