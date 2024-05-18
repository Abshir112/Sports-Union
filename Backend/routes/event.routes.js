import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import requireAuth from '../middlewares/requireAuth.js';

const eventRouter = express.Router();

/**
 * Route handler to get all events from the database.
 * 
 * @name GET /events
 * @function
 * @memberof eventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
eventRouter.get('/', getAllEvents);

// Middleware to verify the token
eventRouter.use(requireAuth);

/**
 * Route handler to create a new event.
 * 
 * @name POST /events
 * @function
 * @memberof eventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
eventRouter.post('/', createEvent);

/**
 * Route handler to get a single event by ID.
 * 
 * @name GET /events/:id
 * @function
 * @memberof eventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
eventRouter.get('/:id', getEventById);

/**
 * Route handler to update an event by ID.
 * 
 * @name PUT /events/:id
 * @function
 * @memberof eventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
eventRouter.put('/:id', updateEvent);

/**
 * Route handler to delete an event by ID.
 * 
 * @name DELETE /events/:id
 * @function
 * @memberof eventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
eventRouter.delete('/:id', deleteEvent);

export default eventRouter;
