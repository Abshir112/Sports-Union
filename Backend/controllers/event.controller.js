import Event from "../models/event.model.js";


// Create and Save a new Event
export const createEvent = async(req, res) => {
    // Create a Event
    const { title, date, location, description, time } = req.body;
    try {
        const event = await Event.create({ title, date, location, description, time });
        res.json(event);
    } catch (error) {
        console.error('Error creating Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get all events from the database
export const getAllEvents = async(req, res) => {
    try {
        const events = await Event.find();
        // format the date and time to be more readable
        res.json(events);
    } catch (error) {
        console.error('Error getting Events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
