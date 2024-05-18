import mongoose from 'mongoose';

/**
 * Mongoose schema for the Notification model.
 * 
 * This schema defines the structure of the Notification documents stored in the MongoDB database.
 * 
 * @type {mongoose.Schema}
 * @property {string} date - The date of the notification.
 * @property {string} description - The description of the notification.
 * 
 * @param {Object} options - Schema options.
 * @param {string} options.collection - The name of the collection where the notification documents will be stored.
 */
const notificationSchema = new mongoose.Schema({
    date: { type: String, required: true },
    description: { type: String, required: true }
}, { collection: 'Notification' });

/**
 * Mongoose model for the Notification schema.
 * 
 * This model represents the notifications and provides methods for interacting with the notifications collection in MongoDB.
 * 
 * @typedef {Object} Notification
 * @property {string} date - The date of the notification.
 * @property {string} description - The description of the notification.
 * 
 * @returns {mongoose.Model<Notification>} The Notification model.
 */
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
