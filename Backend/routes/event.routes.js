import express from 'express';
import {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller.js';

const eventrRouter = express.Router();
// Create route for the Event
eventrRouter.post('/create-event', createEvent);

// get all events from the database
eventrRouter.get('/get-events', getAllEvents);

// get a single event by id
eventrRouter.get('/get-event/:id', getEventById);

// update a event by id
eventrRouter.put('/update-event/:id', updateEvent);

// delete a event by id
eventrRouter.delete('/delete-event/:id', deleteEvent);


export default eventrRouter;
