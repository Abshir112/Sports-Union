import express from 'express';
import {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller.js';

const eventRouter = express.Router();
// Create route for the Event
eventRouter.post('/', createEvent);

// get all events from the database
eventRouter.get('/', getAllEvents);

// get a single event by id
eventRouter.get('/:id', getEventById);

// update a event by id
eventRouter.put('/:id', updateEvent);

// delete a event by id
eventRouter.delete('/:id', deleteEvent);


export default eventRouter;
