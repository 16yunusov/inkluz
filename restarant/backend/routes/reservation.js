const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', (req, res) => res.json({ success: true, message: 'Reservation created' }));
router.get('/', (req, res) => res.json({ success: true, data: [] }));

module.exports = router;
