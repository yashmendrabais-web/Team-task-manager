const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const { register, login, logout, getMe } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
module.exports = router;
