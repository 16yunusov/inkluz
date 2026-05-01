const User = require('../models/User');
const Order = require('../models/Order');
const Menu = require('../models/Menu');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalMenu = await Menu.countDocuments();
    
    const orders = await Order.find();
    const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalMenu,
        revenue
      }
    });
  } catch (err) {
    next(err);
  }
};
