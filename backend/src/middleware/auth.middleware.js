const { errorResponse } = require('../utils/response.utils');
const { verifyToken } = require('../utils/jwt.utils');

async function protect(req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return errorResponse(res, 'Not authorized, no token', 401);
		}
		const token = authHeader.substring(7);
		const decoded = verifyToken(token);
		if (!decoded) {
			return errorResponse(res, 'Not authorized, invalid token', 401);
		}
		req.user = {
			id: decoded.id || decoded.userId || decoded._id,
		};
		return next();
	} catch (error) {
		return errorResponse(res, 'Not authorized, invalid token', 401);
	}
}

module.exports = {
	protect,
};