const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { searchUser } = require('../controllers/user.controller');

const router = express.Router();
router.get('/search', protect, searchUser);
module.exports = router;
