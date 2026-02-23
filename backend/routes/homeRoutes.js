const express = require('express');
const router = express.Router();
const { getHome, updateHome } = require('../controllers/homeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getHome);
router.put('/', protect, updateHome);

module.exports = router;
