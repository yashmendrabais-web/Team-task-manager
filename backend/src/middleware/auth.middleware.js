const { errorResponse } = require('../utils/response.utils');
const { verifyToken } = require('../utils/jwt.utils');

async function protect(req, res, next) {
	try {
		const token = req.cookies?.token;
		if (!token) {
			return errorResponse(res, 'Not authorized, no token', 401);
		}
		const decoded = verifyToken(token);
		if (!decoded) {
			return errorResponse(res, 'Not authorized, invalid token', 401);
		}
		req.user = decoded;
		return next();
	} catch (error) {
		return errorResponse(res, 'Not authorized, invalid token', 401);
	}
}
module.exports = {
	protect,
};
