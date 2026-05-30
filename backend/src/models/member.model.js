const pool = require('../config/db');

async function getMemberRole(projectId, userId) {
	const [rows] = await pool.execute(
		'SELECT role FROM project_members WHERE project_id = ? AND user_id = ?',
		[projectId, userId]
	);

	return rows[0]?.role || null;
}
async function getMembers(projectId) {
	const [rows] = await pool.execute(
		`SELECT u.id, u.name, u.email, pm.role, pm.joined_at
		FROM project_members pm
		JOIN users u ON u.id = pm.user_id
		WHERE pm.project_id = ?`,
		[projectId]
	);
	return rows;
}
async function addMember(projectId, userId, role) {
	const [result] = await pool.execute(
		'INSERT IGNORE INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)',
		[projectId, userId, role]
	);
	return result.insertId;
}
async function removeMember(projectId, userId) {
	const [result] = await pool.execute(
		'DELETE FROM project_members WHERE project_id = ? AND user_id = ?',
		[projectId, userId]
	);
	return result.affectedRows;
}
async function isMember(projectId, userId) {
	const [rows] = await pool.execute(
		'SELECT id FROM project_members WHERE project_id = ? AND user_id = ?',
		[projectId, userId]
	);
	return rows.length > 0;
}
module.exports = {
	getMemberRole,
	getMembers,
	addMember,
	removeMember,
	isMember,
};
