const express = require('express');
const router = express.Router();
const { getResume, updateResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getResume);
router.put('/', protect, updateResume);

module.exports = router;
