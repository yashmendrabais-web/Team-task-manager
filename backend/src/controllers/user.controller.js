const pool = require('../config/db');
const { successResponse, errorResponse } = require('../utils/response.utils');

async function searchUser(req, res) {
	try {
		const email = req.query.email;
		const currentUserId = req.user && req.user.id ? req.user.id : 0;
		if (!email) {
			return successResponse(res, 'Users retrieved successfully', []);
		}
		const [rows] = await pool.execute(
			'SELECT id, name, email FROM users WHERE email LIKE ? AND id != ? LIMIT 5',
			['%' + email + '%', currentUserId]
		);
		return successResponse(res, 'Users retrieved successfully', rows);
	} catch (error) {
		console.error('Search user error:', error);
		return errorResponse(res, 'Failed to search users', 500);
	}
}
module.exports = {
	searchUser,
};

