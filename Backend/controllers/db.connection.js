import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.CONNECTION_URL;

/**
 * Connects to the MongoDB database using the connection URI from environment variables.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Logs a success message if connected, or an error message if the connection fails.
 */
export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
