const userModel = require('../models/user.model');
const { generateToken } = require('../utils/jwt.utils');
const { hashPassword, comparePassword } = require('../utils/hash.utils');
const { successResponse, errorResponse } = require('../utils/response.utils');

async function register(req, res) {
	try {
		const { name, email, password } = req.body;
		const existingUser = await userModel.findByEmail(email);
		if (existingUser) {
			return errorResponse(res, 'Email already registered', 400);
		}
		const hashedPassword = await hashPassword(password);
		const userId = await userModel.createUser({
			name,
			email,
			password: hashedPassword,
		});
		const token = generateToken({ id: userId, name, email });
		return successResponse(res, 'Registered successfully', {
			id: userId,
			name,
			email,
			token, 
		}, 201);
	} catch (error) {
		console.error('register error:', error);
		return errorResponse(res, 'Registration failed', 500);
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body;
		const user = await userModel.findByEmail(email);
		if (!user) {
			return errorResponse(res, 'Invalid credentials', 400);
		}
		const isPasswordValid = await comparePassword(password, user.password);
		if (!isPasswordValid) {
			return errorResponse(res, 'Invalid credentials', 400);
		}
		const token = generateToken({ id: user.id, name: user.name, email: user.email });
		return successResponse(res, 'Login successful', {
			id: user.id,
			name: user.name,
			email: user.email,
			token,  
		});
	} catch (error) {
		console.error('login error:', error);
		return errorResponse(res, 'Login failed', 500);
	}
}

async function logout(req, res) {
	try {
		return successResponse(res, 'Logged out successfully', null);
	} catch (error) {
		console.error('logout error:', error);
		return errorResponse(res, 'Logout failed', 500);
	}
}

async function getMe(req, res) {
	try {
		const user = req.user || null;
		if (!user) {
			return errorResponse(res, 'User not found', 404);
		}
		const { password, ...safeUser } = user;
		return successResponse(res, 'User profile retrieved', safeUser);
	} catch (error) {
		console.error('getMe error:', error);
		return errorResponse(res, 'Failed to get user profile', 500);
	}
}

module.exports = {
	register,
	login,
	logout,
	getMe,
};