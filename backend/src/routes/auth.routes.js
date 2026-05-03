const express = require('express');
const router = express.Router();
const { register, login, getMe, getUsers } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const requireRole = require('../middleware/rbac.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', authMiddleware, getMe);
router.get('/users', authMiddleware, requireRole(['admin']), getUsers);

module.exports = router;
