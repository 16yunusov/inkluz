const fs = require('fs');
const path = require('path');
const Menu = require('../models/Menu');

const dbPath = path.join(__dirname, '../data/menu.json');

// Papkani yaratish
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'));
}

// Faylni yaratish (agar yo'q bo'lsa)
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([]));
}

const getLocalMenu = () => JSON.parse(fs.readFileSync(dbPath));
const saveLocalMenu = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.getMenuItems = async (req, res, next) => {
  try {
    // Agar baza ulanmagan bo'lsa, fayldan o'qiymiz
    const localItems = getLocalMenu();
    res.status(200).json({ success: true, count: localItems.length, data: localItems });
  } catch (err) {
    next(err);
  }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const localItems = getLocalMenu();
    const newItem = { _id: Date.now().toString(), ...req.body };
    localItems.push(newItem);
    saveLocalMenu(localItems);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Saqlashda xatolik' });
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    let localItems = getLocalMenu();
    localItems = localItems.filter(item => item._id !== req.params.id);
    saveLocalMenu(localItems);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    let localItems = getLocalMenu();
    const index = localItems.findIndex(item => item._id === req.params.id);
    if (index !== -1) {
      localItems[index] = { ...localItems[index], ...req.body };
      saveLocalMenu(localItems);
    }
    res.status(200).json({ success: true, data: localItems[index] });
  } catch (err) {
    next(err);
  }
};
