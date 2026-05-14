let orders = [];

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
    try {
        const { name, phone, address, items, totalPrice, comment } = req.body;

        const newOrder = {
            id: orders.length + 1,
            name,
            phone,
            address,
            items, // Array of {name, quantity, price}
            totalPrice,
            comment,
            status: 'pending',
            createdAt: new Date()
        };

        orders.push(newOrder);

        res.status(201).json({
            success: true,
            message: "Buyurtmangiz muvaffaqiyatli qabul qilindi",
            data: newOrder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = orders.find(o => o.id === parseInt(id));
        if (!order) return res.status(404).json({ success: false, message: "Buyurtma topilmadi" });

        order.status = status;

        res.status(200).json({
            success: true,
            message: `Buyurtma statusi '${status}' ga o'zgartirildi`,
            data: order
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};
