const pool = require('../config/db');

async function findByEmail(email) {
	const [rows] = await pool.execute(
		'SELECT id, name, email, password, created_at FROM users WHERE email = ?',
		[email]
	);
	return rows[0] || null;
}
async function findById(id) {
	const [rows] = await pool.execute(
		'SELECT id, name, email, created_at FROM users WHERE id = ?',
		[id]
	);
	return rows[0] || null;
}
async function createUser({ name, email, password }) {
	const [result] = await pool.execute(
		'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
		[name, email, password]
	);
	return result.insertId;
}
module.exports = {
	findByEmail,
	findById,
	createUser,
};
