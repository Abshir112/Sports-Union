import mongoose from 'mongoose';

/**
 * Mongoose schema for the Activity model.
 * 
 * This schema defines the structure of the Activity documents stored in the MongoDB database.
 * 
 * @type {mongoose.Schema}
 * @property {string} activityName - The name of the activity.
 * @property {string} date - The date of the activity.
 * @property {number} maxParticipants - The maximum number of participants allowed for the activity.
 * @property {string} location - The location where the activity will take place.
 * @property {string} description - A description of the activity.
 * @property {string} [image] - An optional image URL for the activity.
 * @property {number} currentParticipants - The current number of participants for the activity.
 * @property {string} time - The time when the activity will take place.
 * 
 * @param {Object} options - Schema options.
 * @param {string} options.collection - The name of the collection where the activity documents will be stored.
 */
const activitySchema = new mongoose.Schema({
    activityName: { type: String, required: true },
    date: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    currentParticipants: { type: Number, required: true },
    time: { type: String, required: true }
}, { collection: 'Activity' });

/**
 * Mongoose model for the Activity schema.
 * 
 * This model represents the activities and provides methods for interacting with the activities collection in MongoDB.
 * 
 * @typedef {Object} Activity
 * @property {string} activityName - The name of the activity.
 * @property {string} date - The date of the activity.
 * @property {number} maxParticipants - The maximum number of participants allowed for the activity.
 * @property {string} location - The location where the activity will take place.
 * @property {string} description - A description of the activity.
 * @property {string} [image] - An optional image URL for the activity.
 * @property {number} currentParticipants - The current number of participants for the activity.
 * @property {string} time - The time when the activity will take place.
 * 
 * @returns {mongoose.Model<Activity>} The Activity model.
 */
const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
