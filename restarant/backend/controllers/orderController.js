const fs = require('fs');
const path = require('path');
const Order = require('../models/Order');

const dbPath = path.join(__dirname, '../data/orders.json');

// Faylni yaratish (agar yo'q bo'lsa)
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([]));
}

const getLocalOrders = () => JSON.parse(fs.readFileSync(dbPath));
const saveLocalOrders = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.createOrder = async (req, res, next) => {
  try {
    const localOrders = getLocalOrders();
    const newOrder = { 
      _id: Date.now().toString(), 
      ...req.body, 
      status: 'pending', 
      createdAt: new Date() 
    };
    localOrders.push(newOrder);
    saveLocalOrders(localOrders);
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const localOrders = getLocalOrders();
    res.status(200).json({ success: true, count: localOrders.length, data: localOrders.reverse() });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    let localOrders = getLocalOrders();
    const index = localOrders.findIndex(order => order._id === req.params.id);
    if (index !== -1) {
      localOrders[index].status = req.body.status;
      saveLocalOrders(localOrders);
    }
    res.status(200).json({ success: true, data: localOrders[index] });
  } catch (err) {
    next(err);
  }
};
