import express from 'express';
import { getAllMembers, createMember, connectDB, signUp } from '../controllers/db.js';

const memberRouter = express.Router();

// Call connectDB function
connectDB();

// Route handler to get all members
memberRouter.get('/', async (req, res) => {
    try {
        const members = await getAllMembers();
        res.json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route handler to create a new member
memberRouter.post('/sign-up', async (req, res) => {
    try {
        const newMember = await createMember(req.body);
        res.status(201).json(newMember);
    } catch (error) {
        if (error.message === 'Email is already in use') {
            res.status(400).json({ error: 'Email is already in use' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});
//
memberRouter.post('/sign-in', async (req, res) => {
    try {
        const newMember = await signUp(req.body);
        res.status(201).json(newMember);
    } catch (error) {
        if (error.message === 'Email is already in use') {
            res.status(400).json({ error: 'Email is already in use' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

export default memberRouter;
