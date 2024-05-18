import express from 'express';
import { createUserActivity, getUserActivities, getUserActivity, getUsersWithSameActivity, deleteUserActivity } from '../controllers/users-activities.controller.js';

const usersActivitiesRouter = express.Router();

/**
 * Route handler to get all users' activities.
 * 
 * @name GET /users-activities
 * @function
 * @memberof usersActivitiesRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
usersActivitiesRouter.get('/', getUserActivities);

/**
 * Route handler to get activities of a single user by ID.
 * 
 * @name GET /users-activities/:id
 * @function
 * @memberof usersActivitiesRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
usersActivitiesRouter.get('/:id', getUserActivity);

/**
 * Route handler to get users who have the same activity.
 * 
 * @name GET /users-activities/same/:id
 * @function
 * @memberof usersActivitiesRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
usersActivitiesRouter.get('/same/:id', getUsersWithSameActivity);

/**
 * Route handler to create a new user activity.
 * 
 * @name POST /users-activities/user-activity
 * @function
 * @memberof usersActivitiesRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
usersActivitiesRouter.post('/user-activity', createUserActivity);

/**
 * Route handler to delete a user activity.
 * 
 * @name DELETE /users-activities
 * @function
 * @memberof usersActivitiesRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
usersActivitiesRouter.delete('/', deleteUserActivity);

export default usersActivitiesRouter;
