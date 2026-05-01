const express = require('express');
const { getRestaurants, getRestaurantsInRadius } = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', getRestaurants);
router.get('/radius/:zipcode/:distance', getRestaurantsInRadius);

module.exports = router;
