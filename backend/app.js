require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { errorResponse } = require('./src/utils/response.utils');
const authRoutes = require('./src/routes/auth.routes');
const projectRoutes = require('./src/routes/project.routes');
const taskRoutes = require('./src/routes/task.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const userRoutes = require('./src/routes/user.routes');

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || '')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

app.use(
	cors({
		origin(origin, callback) {
			if (!origin) {
				return callback(null, true);
			}

			if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}

			return callback(new Error(`CORS blocked for origin ${origin}`));
		},
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
	res.json({ success: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => errorResponse(res, 'Route not found', 404));

app.use((err, req, res, next) => {
	console.error(err.stack);
	errorResponse(res, 'Internal server error', 500);
});

module.exports = app;