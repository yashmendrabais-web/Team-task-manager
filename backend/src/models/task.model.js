const pool = require('../config/db');

async function getByProject(projectId) {
	const [rows] = await pool.execute(
		`SELECT t.*, 
		u1.name as assigned_to_name,
		u2.name as created_by_name
		FROM tasks t
		LEFT JOIN users u1 ON u1.id = t.assigned_to
		JOIN users u2 ON u2.id = t.created_by
		WHERE t.project_id = ?
		ORDER BY t.created_at DESC`,
		[projectId]
	);
	return rows;
}
async function getByAssignee(userId) {
	const [rows] = await pool.execute(
		`SELECT t.*, 
		p.name as project_name,
		u1.name as assigned_to_name,
		u2.name as created_by_name
		FROM tasks t
		JOIN projects p ON p.id = t.project_id
		JOIN project_members pm ON pm.project_id = t.project_id AND pm.user_id = ?
		LEFT JOIN users u1 ON u1.id = t.assigned_to
		JOIN users u2 ON u2.id = t.created_by
		WHERE t.assigned_to = ?
		ORDER BY t.created_at DESC`,
		[userId, userId]
	);
	return rows;
}
async function getByProjectAndAssignee(projectId, userId) {
	const [rows] = await pool.execute(
		`SELECT t.*, 
		u1.name as assigned_to_name,
		u2.name as created_by_name
		FROM tasks t
		LEFT JOIN users u1 ON u1.id = t.assigned_to
		JOIN users u2 ON u2.id = t.created_by
		WHERE t.project_id = ? AND t.assigned_to = ?
		ORDER BY t.created_at DESC`,
		[projectId, userId]
	);
	return rows;
}
async function getById(taskId) {
	const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
	return rows[0] || null;
}
async function create({ title, description, project_id, assigned_to, created_by, status, priority, due_date }) {
	const [result] = await pool.execute(
		'INSERT INTO tasks (title, description, project_id, assigned_to, created_by, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
		[title, description, project_id, assigned_to, created_by, status, priority, due_date]
	);
	return result.insertId;
}
async function update(taskId, { title, description, assigned_to, status, priority, due_date }) {
	const [result] = await pool.execute(
		'UPDATE tasks SET title = ?, description = ?, assigned_to = ?, status = ?, priority = ?, due_date = ? WHERE id = ?',
		[title, description, assigned_to, status, priority, due_date, taskId]
	);
	return result.affectedRows;
}
async function updateStatus(taskId, status) {
	const [result] = await pool.execute(
		'UPDATE tasks SET status = ? WHERE id = ?',
		[status, taskId]
	);
	return result.affectedRows;
}
async function deleteById(taskId) {
	const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
	return result.affectedRows;
}
module.exports = {
	getByProject,
	getByAssignee,
	getByProjectAndAssignee,
	getById,
	create,
	update,
	updateStatus,
	deleteById,
};
