import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

// Function to retrieve all Users
export const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
    } catch (error) {
        console.error('Error fetching Users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to create a new User with validation
// export const createUser = async (UserData) => {
//     const {name, email,phone,personalNumber,password, role } = UserData;
//     const hashPassword = bcrypt.hashSync(password, 10)
//     const newUser = await User.create({name, email,phone,personalNumber,password:hashPassword, role });
//     try {
//         newUser.save();
//         return newUser;
//     } catch (error) {
//         throw new Error('Failed to add the new employee', error); // Rethrow the error for handling in the caller
//     }
// };


// Function to update a User by ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const newUpdatedUser = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, newUpdatedUser, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating User:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to delete a User by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting User:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

