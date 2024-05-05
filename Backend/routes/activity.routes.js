import express from 'express';
import { getAllActivities, createActivity, updateActivity, deleteActivity} from '../controllers/activity.controller.js';
import requireAuth from '../middlewares/requireAuth.js'

const activityRouter = express.Router();

// Middleware to verify the token
activityRouter.use(requireAuth);


// Route handler to get all activities
activityRouter.get('/', getAllActivities);

// Route handler to create a new activity
activityRouter.post('/', createActivity);

// Route handler to update an activity
activityRouter.put('/:id', updateActivity);

// Route handler to delete an activity
activityRouter.delete('/:id', deleteActivity);

export default activityRouter;
