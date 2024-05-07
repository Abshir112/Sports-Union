import express from 'express';
import {createEvent, getAllEvents} from '../controllers/event.controller.js';

const eventrRouter = express.Router();
// Create route for the Event
eventrRouter.post('/create-event', createEvent);

// get all events from the database
eventrRouter.get('/get-events', getAllEvents);
export default eventrRouter;
