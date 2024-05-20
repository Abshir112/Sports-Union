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
        const { title, date, maxParticipants, location, description, time, image } = req.body;
        const availableSpots = maxParticipants; // Initialize available spots to maxParticipants

        const event = await Event.create({ title, date, maxParticipants, location, description, time, image, availableSpots });
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
    const { title, date, location, description, time, maxParticipants } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(id, { title, date, location, description, time, maxParticipants }, { new: true });
        if (maxParticipants && event) {
            const currentParticipants = event.currentParticipants;
            const availableSpots = maxParticipants - currentParticipants;
            event.availableSpots = availableSpots;
            await event.save();
        }
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

/**
 * Registers a user for an event.
 * 
 * @async
 * @function registerForEvent
 * @param {object} req - Express request object containing user ID and event ID in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the updated event or an error message.
 */
export const registerForEvent = async (req, res) => {
    const { userId, eventId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.availableSpots > 0) {
            event.availableSpots -= 1;
            event.currentParticipants += 1;
            await event.save();
            res.status(201).json({ message: 'Registered successfully', event });
        } else {
            res.status(400).json({ message: 'No available spots' });
        }
    } catch (error) {
        console.error('Error registering for Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Unregisters a user from an event.
 * 
 * @async
 * @function unregisterFromEvent
 * @param {object} req - Express request object containing user ID and event ID in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the updated event or an error message.
 */
export const unregisterFromEvent = async (req, res) => {
    const { userId, eventId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.currentParticipants > 0) {
            event.availableSpots += 1;
            event.currentParticipants -= 1;
            await event.save();
            res.status(201).json({ message: 'Unregistered successfully', event });
        } else {
            res.status(400).json({ message: 'No participants to remove' });
        }
    } catch (error) {
        console.error('Error unregistering from Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
