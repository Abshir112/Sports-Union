import express from 'express';
import userRouter from './routes/user.routes.js';
import activityRouter from './routes/activity.routes.js';
import {connectDB} from './controllers/db.connection.js';
import eventRouter from './routes/event.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import usersActivitiesRouter from './routes/user-activities.routes.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to connect to the database
connectDB();

// Middleware to enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());

app.use('/users', userRouter);

app.use('/activities', activityRouter);

app.use('/users-activities', usersActivitiesRouter);

app.use('/events', eventRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});