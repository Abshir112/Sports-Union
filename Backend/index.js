import express from 'express';
import memberRouter from './routes/memberRoute.js';
import activityRouter from './routes/activityRoute.js';
import {connectDB} from './controllers/db.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to connect to the database
connectDB();


// Body parser middleware
app.use(express.json());

app.use('/member', memberRouter);

app.use('/activity', activityRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

