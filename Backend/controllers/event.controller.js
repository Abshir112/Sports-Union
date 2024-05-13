import Event from "../models/event.model.js";


// Create and Save a new Event
export const createEvent = async(req, res) => {
    // Create a Event
    // const { title, date, location, description, time } = req.body;
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
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

// get a single event by id
export const getEventById = async(req , res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        res.json(event);
    } catch (error) {
        console.error('Error getting Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// update a event by id
export const updateEvent = async(req, res) => {
    const id = req.params.id;
    const { title, date, location, description, time } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(id, { title, date, location, description, time }, { new: true });
        res.json(event);
    } catch (error) {
        console.error('Error updating Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// delete a event by id
export const deleteEvent = async(req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndDelete(id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


