import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * Middleware to require authentication for protected routes.
 * 
 * This middleware checks for the presence of an authorization token in the request headers,
 * verifies the token, and attaches the user's ID to the request object if the token is valid.
 * 
 * @async
 * @function requireAuth
 * @param {object} req - Express request object, including the headers with the authorization token.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise<void>} Calls next() if authentication is successful or responds with an error message if not.
 */
const requireAuth = async (req, res, next) => {
    // verify authorization header
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    // verify token
    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        return res.status(401).json({ error: 'You must be logged in' });
    }
};

export default requireAuth;
