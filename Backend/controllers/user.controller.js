import User from "../models/user.model.js";

/**
 * Retrieves all users from the database.
 * 
 * @async
 * @function getAllUsers
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of users or an error message.
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Retrieves a user by ID.
 * 
 * @async
 * @function getUserById
 * @param {object} req - Express request object containing user ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the user or an error message.
 */
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


/**
 * Updates a user by ID.
 * 
 * @async
 * @function updateUser
 * @param {object} req - Express request object containing user ID in params and updated data in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the updated user or an error message.
 */
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const newUpdatedUser = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, newUpdatedUser, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Deletes a user by ID.
 * 
 * @async
 * @function deleteUser
 * @param {object} req - Express request object containing user ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 */
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
