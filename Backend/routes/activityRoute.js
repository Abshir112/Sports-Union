import express from 'express';
import { getAllActivities, createActivity, connectDB } from '../controllers/db.js';

const activityRouter = express.Router();

// Call connectDB function
connectDB();

// Route handler to get all activities
activityRouter.get('/', async (req, res) => {
    try {
        const activities = await getAllActivities();
        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route handler to create a new activity
activityRouter.post('/', async (req, res) => {
    try {
        const newActivity = await createActivity(req.body);
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});

export default activityRouter;
