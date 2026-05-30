const pool = require('../config/db');
const { successResponse, errorResponse } = require('../utils/response.utils');

async function getDashboard(req, res) {
	try {
		const userId = req.user.id;
		const [[totalProjectsRows], [totalTasksRows], [myTasksRows], [overdueTasksRows], [statusRows], [recentRows], [overdueRows]
		] = await Promise.all([
			pool.execute(
				'SELECT COUNT(*) as total FROM project_members WHERE user_id = ?',
				[userId]
			),
			pool.execute(
				'SELECT COUNT(*) as total FROM tasks t JOIN project_members pm ON pm.project_id = t.project_id AND pm.user_id = ?',
				[userId]
			),
			pool.execute(
				'SELECT COUNT(*) as total FROM tasks WHERE assigned_to = ?',
				[userId]
			),
			pool.execute(
				"SELECT COUNT(*) as total FROM tasks t JOIN project_members pm ON pm.project_id = t.project_id AND pm.user_id = ? WHERE t.due_date < CURDATE() AND t.status != 'done'",
				[userId]
			),
			pool.execute(
				'SELECT status, COUNT(*) as count FROM tasks WHERE assigned_to = ? GROUP BY status',
				[userId]
			),
			pool.execute(
				`SELECT t.*, p.name as project_name,
				u.name as assigned_to_name
				FROM tasks t
				JOIN projects p ON p.id = t.project_id
				JOIN project_members pm ON pm.project_id = t.project_id AND pm.user_id = ?
				LEFT JOIN users u ON u.id = t.assigned_to
				ORDER BY t.created_at DESC LIMIT 10`,
				[userId]
			),
			pool.execute(
				`SELECT t.*, p.name as project_name,
				u.name as assigned_to_name
				FROM tasks t
				JOIN projects p ON p.id = t.project_id
				JOIN project_members pm ON pm.project_id = t.project_id AND pm.user_id = ?
				LEFT JOIN users u ON u.id = t.assigned_to
				WHERE t.due_date < CURDATE() AND t.status != 'done'
				ORDER BY t.due_date ASC LIMIT 5`,
				[userId]
			),
		]);
		const total_projects = Number(totalProjectsRows[0]?.total || 0);
		const total_tasks = Number(totalTasksRows[0]?.total || 0);
		const my_tasks = Number(myTasksRows[0]?.total || 0);
		const overdue_tasks = Number(overdueTasksRows[0]?.total || 0);
		const status_breakdown = statusRows.map((row) => ({
			status: row.status,
			count: Number(row.count || 0),
		}));
		return successResponse(res, 'Dashboard retrieved successfully', {
			stats: {
				total_projects,
				total_tasks,
				my_tasks,
				overdue_tasks,
			},
			status_breakdown,
			recent_tasks: recentRows,
			overdue_list: overdueRows,
		});
	} catch (error) {
		console.error('getDashboard error:', error);
		return errorResponse(res, 'Failed to get dashboard', 500);
	}
}
module.exports = {
	getDashboard,
};
