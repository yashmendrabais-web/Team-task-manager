require('dotenv').config();
const app = require('./app');
const pool = require('./src/config/db');
const PORT = process.env.PORT || 5000;

process.on('uncaughtException', err => {
	console.error(err);
	process.exit(1);
});
process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});
async function startServer() {
	try {
		const connection = await pool.getConnection();
		console.log('MySQL Connected');
		connection.release();
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}
startServer();

 