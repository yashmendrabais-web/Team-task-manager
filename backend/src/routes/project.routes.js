const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/role.middleware');
const { validate } = require('../middleware/validate.middleware');
const { projectValidator } = require('../validators/project.validator');
const {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,
	addMember,
	removeMember,
} = require('../controllers/project.controller');

const router = express.Router();
router.get('/', protect, getProjects);
router.post('/', protect, projectValidator, validate, createProject);
router.get('/:id', protect, getProject);
router.put('/:id', protect, requireAdmin, projectValidator, validate, updateProject);
router.delete('/:id', protect, requireAdmin, deleteProject);
router.post('/:id/members', protect, requireAdmin, addMember);
router.delete('/:id/members/:uid', protect, requireAdmin, removeMember);
module.exports = router;
