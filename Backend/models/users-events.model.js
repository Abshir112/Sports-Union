import mongoose from 'mongoose';

/**
 * Mongoose schema for the UserEvent model.
 * 
 * This schema defines the structure of the UserEvent documents stored in the MongoDB database.
 * 
 * @type {mongoose.Schema}
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user associated with the event.
 * @property {mongoose.Schema.Types.ObjectId} eventId - The ID of the event associated with the user.
 * 
 * @param {Object} options - Schema options.
 * @param {string} options.collection - The name of the collection where the userEvent documents will be stored.
 */
const userEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
}, { collection: 'userEvent' });

/**
 * Mongoose model for the UserEvent schema.
 * 
 * This model represents the user-event associations and provides methods for interacting with the userEvent collection in MongoDB.
 * 
 * @typedef {Object} UserEvent
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user associated with the event.
 * @property {mongoose.Schema.Types.ObjectId} eventId - The ID of the event associated with the user.
 * 
 * @returns {mongoose.Model<UserEvent>} The UserEvent model.
 */
const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;
