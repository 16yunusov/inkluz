const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrderStatus } = require('../controllers/orderController');
const { getReservations, createReservation, updateReservationStatus } = require('../controllers/reservationController');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { login } = require('../controllers/authController');
const { validateOrder, validateReservation } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Auth routes
router.post('/auth/login', login);

// Product routes
router.get('/products', getProducts);
router.post('/products', protect, createProduct);
router.put('/products/:id', protect, updateProduct);
router.delete('/products/:id', protect, deleteProduct);

// Order routes
router.get('/orders', protect, getOrders);
router.post('/orders', validateOrder, createOrder);
router.patch('/orders/:id/status', protect, updateOrderStatus);

// Reservation routes
router.get('/reservations', protect, getReservations);
router.post('/reservation', validateReservation, createReservation);
// Status check route (for users)
router.get('/status/:phone', async (req, res) => {
    try {
        const { phone } = req.params;
        const orders = require('../data/orders');
        const reservations = require('../data/reservations');

        const order = [...orders].reverse().find(o => o.telefonRaqam.replace(/\s/g, '') === phone.replace(/\s/g, ''));
        const reservation = [...reservations].reverse().find(r => r.telefonRaqam.replace(/\s/g, '') === phone.replace(/\s/g, ''));

        res.status(200).json({
            success: true,
            order: order || null,
            reservation: reservation || null
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Xatolik yuz berdi" });
    }
});

module.exports = router;
