const pool = require('../config/db');

async function getAllByUserId(userId) {
	const [rows] = await pool.execute(
		`SELECT p.*, u.name as owner_name,
		pm.role as my_role,
		(SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id) as task_count,
		(SELECT COUNT(*) FROM project_members pm2 WHERE pm2.project_id = p.id) as member_count
		FROM projects p
		JOIN users u ON u.id = p.owner_id
		JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = ?
		ORDER BY p.created_at DESC`,
		[userId]
	);
	return rows;
}
async function getById(projectId, userId) {
	const [rows] = await pool.execute(
		`SELECT p.*, u.name as owner_name, pm.role as my_role
		FROM projects p
		JOIN users u ON u.id = p.owner_id
		JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = ?
		WHERE p.id = ?`,
		[userId, projectId]
	);
	return rows[0] || null;
}
async function create({ name, description, owner_id }) {
	const [result] = await pool.execute(
		'INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)',
		[name, description, owner_id]
	);
	return result.insertId;
}
async function update(projectId, { name, description }) {
	const [result] = await pool.execute(
		'UPDATE projects SET name = ?, description = ? WHERE id = ?',
		[name, description, projectId]
	);
	return result.affectedRows;
}
async function deleteById(projectId) {
	const [result] = await pool.execute('DELETE FROM projects WHERE id = ?', [projectId]);
	return result.affectedRows;
}
module.exports = {
	getAllByUserId,
	getById,
	create,
	update,
	deleteById,
};
