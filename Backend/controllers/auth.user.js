import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

/**
 * Creates a JWT token for a user.
 * 
 * @function createToken
 * @param {string} _id - The user ID.
 * @returns {string} JWT token.
 */
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60 // Token expires in 3 days
    });
}

/**
 * Signs up a new user.
 * 
 * @async
 * @function signUp
 * @param {object} req - Express request object containing user details in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the created user and a JWT token, or an error message.
 */
export const signUp = async (req, res) => {
    const { name, email, phone, personalNumber, password } = req.body;
    try {
        const user = await User.signup(email, password, name, phone, personalNumber);
        const token = createToken(user._id);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Signs in an existing user.
 * 
 * @async
 * @function signIn
 * @param {object} req - Express request object containing login details in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the authenticated user and a JWT token, or an error message.
 */
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
