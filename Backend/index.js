import express from 'express';
import userRouter from './routes/user.routes.js';
import activityRouter from './routes/activity.routes.js';
import { connectDB } from './controllers/db.connection.js';
import eventRouter from './routes/event.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import usersActivitiesRouter from './routes/user-activities.routes.js';
import userEventRouter from './routes/user-events.routes.js';
import notificationRouter from './routes/notification.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware to connect to the database.
 */
connectDB();

/**
 * Middleware to enable CORS.
 */
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('../Frontend/dist'));

/**
 * Middleware for parsing JSON bodies from requests.
 */
app.use(express.json());

/**
 * Route for user-related endpoints.
 */
app.use('/users', userRouter);

/**
 * Route for activity-related endpoints.
 */
app.use('/activities', activityRouter);

/**
 * Route for users-activities-related endpoints.
 */
app.use('/users-activities', usersActivitiesRouter);

/**
 * Route for event-related endpoints.
 */
app.use('/events', eventRouter);

/**
 * Route for user-events-related endpoints.
 */
app.use('/users-events', userEventRouter);

/**
 * Route for notification-related endpoints.
 */
app.use('/notifications', notificationRouter);


/**
 * Start the server.
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
