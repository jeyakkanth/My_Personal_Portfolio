const express = require('express');
const router = express.Router();
const { getProjects, updateProjects } = require('../controllers/projectsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.put('/', protect, updateProjects);

module.exports = router;
