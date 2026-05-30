const { body } = require('express-validator');

const taskValidator = [
	body('title')
		.trim()
		.notEmpty().withMessage('Title is required')
		.isLength({ max: 200 }).withMessage('Max 200 chars'),
	body('status')
		.optional()
		.isIn(['todo', 'in_progress', 'done'])
		.withMessage('Invalid status'),
	body('priority')
		.optional()
		.isIn(['low', 'medium', 'high'])
		.withMessage('Invalid priority'),
	body('due_date')
		.optional({ nullable: true })
		.isDate().withMessage('Invalid date format'),
];
module.exports = {
	taskValidator,
};
