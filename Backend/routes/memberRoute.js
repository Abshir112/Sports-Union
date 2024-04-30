import express from 'express';
import { signUp, signIn } from '../controllers/auth.user.js';
import { connectDB, getAllMembers } from '../controllers/db.js';

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
memberRouter.post('/sign-up',signUp);

//  Route handler to login a member
memberRouter.post('/sign-in', signIn);

export default memberRouter;
