const express = require('express');
const {
  getMenuItems,
  createMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const router = express.Router();

// Test paytida hamma taom qo'sha olishi uchun protect va authorize olib tashlandi
router.route('/').get(getMenuItems).post(createMenuItem);
router.route('/:id').delete(deleteMenuItem);

module.exports = router;
