const express = require('express');
const router = express.Router();
const { getExperience, updateExperience } = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getExperience);
router.put('/', protect, updateExperience);

module.exports = router;
