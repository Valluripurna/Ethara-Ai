const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const requireRole = require('../middleware/rbac.middleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');
const {
  createResourceLimiter,
  createSustainedLimiter
} = require('../middleware/rateLimit.middleware');

router.use(authMiddleware);

router.get('/', getTasks);
router.post(
  '/',
  requireRole(['admin']),
  createResourceLimiter,
  createSustainedLimiter,
  createTask
);
router.put('/:id', updateTask);
router.delete('/:id', requireRole(['admin']), deleteTask);

module.exports = router;
