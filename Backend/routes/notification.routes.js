import express from 'express';
import { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } from '../controllers/notification.controller.js';

const notificationRouter = express.Router();

/**
 * Route handler to create a new notification.
 * 
 * @name POST /notifications
 * @function
 * @memberof notificationRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
notificationRouter.post('/', createNotification);

/**
 * Route handler to get all notifications from the database.
 * 
 * @name GET /notifications
 * @function
 * @memberof notificationRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
notificationRouter.get('/', getAllNotifications);

/**
 * Route handler to get a single notification by ID.
 * 
 * @name GET /notifications/:id
 * @function
 * @memberof notificationRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
notificationRouter.get('/:id', getNotificationById);

/**
 * Route handler to update a notification by ID.
 * 
 * @name PUT /notifications/:id
 * @function
 * @memberof notificationRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
notificationRouter.put('/:id', updateNotification);

/**
 * Route handler to delete a notification by ID.
 * 
 * @name DELETE /notifications/:id
 * @function
 * @memberof notificationRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
notificationRouter.delete('/:id', deleteNotification);

export default notificationRouter;
