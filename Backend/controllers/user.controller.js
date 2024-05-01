import Member from "../models/user.model.js";
import bcrypt from 'bcryptjs';

// Function to retrieve all members
export const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to create a new member with validation
export const createMember = async (memberData) => {
    const {name, email,phone,personalNumber,password } = memberData;
    const hashPassword = bcrypt.hashSync(password, 10)
    const newEmployee = await Member.create({name, email,phone,personalNumber,password:hashPassword});
    try {
        newEmployee.save();
        return newEmployee;
    } catch (error) {
        throw new Error('Failed to add the new employee', error); // Rethrow the error for handling in the caller
    }
};
