const Restaurant = require('../models/Restaurant');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, count: restaurants.length, data: restaurants });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Find nearest restaurant
// @route   GET /api/restaurants/radius/:zipcode/:distance
// @access  Public
exports.getRestaurantsInRadius = async (req, res) => {
  // Logic for finding restaurants within radius using coordinates or zip
  // Simplified for this demo: returns all
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, count: restaurants.length, data: restaurants });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
