import express from 'express';
import { createUserActivity, getUserActivities, getUserActivity, getUsersWithSameActivity, deleteUserActivity } from '../controllers/users-activities.controller.js';

const usersActivitiesRouter = express.Router();




// Route handler to get all users activities
usersActivitiesRouter.get('/', getUserActivities);

// Route handler to get a single user's activities
usersActivitiesRouter.get('/:id', getUserActivity);

// Route handler to get users have the same activities
usersActivitiesRouter.get('/:id', getUsersWithSameActivity);

// Route handler to create a new user activity
usersActivitiesRouter.post('/user-activity', createUserActivity);

// Route handler to delete a user activity
usersActivitiesRouter.delete('/',  deleteUserActivity);

export default usersActivitiesRouter;
