import express from 'express';
import userRouter from './routes/user.routes.js';
import activityRouter from './routes/activity.routes.js';
import {connectDB} from './controllers/db.connection.js';
import eventrRouter from './routes/event.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

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

app.use('/activity', activityRouter);

app.use('/event', eventrRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

