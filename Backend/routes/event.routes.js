import express from 'express';
import {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller.js';

const eventRouter = express.Router();
// Create route for the Event
eventRouter.post('/create-event', createEvent);

// get all events from the database
eventRouter.get('/get-events', getAllEvents);

// get a single event by id
eventRouter.get('/get-event/:id', getEventById);

// update a event by id
eventRouter.put('/update-event/:id', updateEvent);

// delete a event by id
eventRouter.delete('/delete-event/:id', deleteEvent);


export default eventRouter;
