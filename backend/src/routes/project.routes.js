const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const requireRole = require('../middleware/rbac.middleware');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById
} = require('../controllers/project.controller');
const {
  createResourceLimiter,
  createSustainedLimiter
} = require('../middleware/rateLimit.middleware');

router.use(authMiddleware);

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post(
  '/',
  requireRole(['admin']),
  createResourceLimiter,
  createSustainedLimiter,
  createProject
);
router.put('/:id', requireRole(['admin']), updateProject);
router.delete('/:id', requireRole(['admin']), deleteProject);

module.exports = router;
