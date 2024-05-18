import mongoose from 'mongoose';

/**
 * Mongoose schema for the UserActivity model.
 * 
 * This schema defines the structure of the UserActivity documents stored in the MongoDB database.
 * 
 * @type {mongoose.Schema}
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user participating in the activity.
 * @property {mongoose.Schema.Types.ObjectId} activityId - The ID of the activity in which the user is participating.
 * 
 * @param {Object} options - Schema options.
 * @param {string} options.collection - The name of the collection where the userActivity documents will be stored.
 */
const userActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true }
}, { collection: 'userActivity' });

/**
 * Mongoose model for the UserActivity schema.
 * 
 * This model represents the user activity associations and provides methods for interacting with the userActivity collection in MongoDB.
 * 
 * @typedef {Object} UserActivity
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user participating in the activity.
 * @property {mongoose.Schema.Types.ObjectId} activityId - The ID of the activity in which the user is participating.
 * 
 * @returns {mongoose.Model<UserActivity>} The UserActivity model.
 */
const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;
