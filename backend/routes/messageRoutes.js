const express = require('express');
const router = express.Router();
const { getMessages, postMessage, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getMessages);
router.post('/', postMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
