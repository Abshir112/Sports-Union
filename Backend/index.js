import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './controllers/db.connection.js';
import apiRouter from './api.router.js';  // Import the new API router

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

/**
 * Middleware for parsing JSON bodies from requests.
 */
app.use(express.json());

/**
 * Serve static files from the frontend build directory.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

/**
 * Use the versioned API router
 */
app.use('/api/v1', apiRouter);

/**
 * Catch-all route to serve the React app's index.html for any non-API routes.
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

/**
 * Start the server.
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});