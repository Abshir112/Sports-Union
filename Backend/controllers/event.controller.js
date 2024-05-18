import Event from "../models/event.model.js";

/**
 * Creates and saves a new event.
 * 
 * @async
 * @function createEvent
 * @param {object} req - Express request object containing event details in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the created event or an error message.
 */
export const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Retrieves all events from the database.
 * 
 * @async
 * @function getAllEvents
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of events or an error message.
 */
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error getting Events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Retrieves a single event by ID.
 * 
 * @async
 * @function getEventById
 * @param {object} req - Express request object containing event ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the event details or an error message.
 */
export const getEventById = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        res.json(event);
    } catch (error) {
        console.error('Error getting Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Updates an event by ID.
 * 
 * @async
 * @function updateEvent
 * @param {object} req - Express request object containing event ID in params and updated data in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the updated event or an error message.
 */
export const updateEvent = async (req, res) => {
    const id = req.params.id;
    const { title, date, location, description, time } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(id, { title, date, location, description, time }, { new: true });
        res.json(event);
    } catch (error) {
        console.error('Error updating Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Deletes an event by ID.
 * 
 * @async
 * @function deleteEvent
 * @param {object} req - Express request object containing event ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 */
export const deleteEvent = async (req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndDelete(id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
