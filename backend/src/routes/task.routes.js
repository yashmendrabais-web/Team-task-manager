const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const { taskValidator } = require('../validators/task.validator');
const {
	getProjectTasks,
	getMyTasks,
	createTask,
	updateTask,
	updateTaskStatus,
	deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();
router.get('/my', protect, getMyTasks);
router.get('/project/:projectId', protect, getProjectTasks);
router.post('/', protect, taskValidator, validate, createTask);
router.put('/:id', protect, taskValidator, validate, updateTask);
router.patch('/:id/status', protect, updateTaskStatus);
router.delete('/:id', protect, deleteTask);
module.exports = router;
