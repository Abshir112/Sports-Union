import Notification from "../models/notification.model.js";

/**
 * Creates and saves a new notification.
 * 
 * @async
 * @function createNotification
 * @param {object} req - Express request object containing notification details in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the created notification or an error message.
 */
export const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        console.error('Error creating Notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Retrieves all notifications from the database.
 * 
 * @async
 * @function getAllNotifications
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of notifications or an error message.
 */
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        console.error('Error getting Notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Retrieves a single notification by ID.
 * 
 * @async
 * @function getNotificationById
 * @param {object} req - Express request object containing notification ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the notification details or an error message.
 */
export const getNotificationById = async (req, res) => {
    const id = req.params.id;
    try {
        const notification = await Notification.findById(id);
        res.json(notification);
    } catch (error) {
        console.error('Error getting Notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Updates a notification by ID.
 * 
 * @async
 * @function updateNotification
 * @param {object} req - Express request object containing notification ID in params and updated data in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the updated notification or an error message.
 */
export const updateNotification = async (req, res) => {
    const id = req.params.id;
    const { date, description } = req.body;
    try {
        const notification = await Notification.findByIdAndUpdate(id, { date, description }, { new: true });
        res.json(notification);
    } catch (error) {
        console.error('Error updating Notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Deletes a notification by ID.
 * 
 * @async
 * @function deleteNotification
 * @param {object} req - Express request object containing notification ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 */
export const deleteNotification = async (req, res) => {
    const id = req.params.id;
    try {
        await Notification.findByIdAndDelete(id);
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting Notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
