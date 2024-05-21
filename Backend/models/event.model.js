import mongoose from 'mongoose';

/**
 * Mongoose schema for the Event model.
 * 
 * This schema defines the structure of the Event documents stored in the MongoDB database.
 * 
 * @type {mongoose.Schema}
 * @property {string} title - The title of the event.
 * @property {string} date - The date of the event.
 * @property {number} maxParticipants - The maximum number of participants allowed for the event.
 * @property {string} location - The location where the event will take place.
 * @property {string} description - A description of the event.
 * @property {string} time - The time when the event will take place.
 * @property {number} currentParticipants - The current number of participants for the event.
 * @property {number} availableSpots - The number of available spots for the event.
 * @property {string} [image] - An optional image URL for the event.
 * 
 * @param {Object} options - Schema options.
 * @param {string} options.collection - The name of the collection where the event documents will be stored.
 */
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    currentParticipants: { type: Number, default: 0 },
    availableSpots: { type: Number, required: false }, // Add availableSpots property
    image: { type: String, required: false }
}, { collection: 'Event' });

/**
 * Mongoose model for the Event schema.
 * 
 * This model represents the events and provides methods for interacting with the events collection in MongoDB.
 * 
 * @typedef {Object} Event
 * @property {string} title - The title of the event.
 * @property {string} date - The date of the event.
 * @property {number} maxParticipants - The maximum number of participants allowed for the event.
 * @property {string} location - The location where the event will take place.
 * @property {string} description - A description of the event.
 * @property {string} time - The time when the event will take place.
 * @property {number} currentParticipants - The current number of participants for the event.
 * @property {number} availableSpots - The number of available spots for the event.
 * @property {string} [image] - An optional image URL for the event.
 * 
 * @returns {mongoose.Model<Event>} The Event model.
 */
const Event = mongoose.model('Event', eventSchema);

export default Event;
