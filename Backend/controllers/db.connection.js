import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.CONNECTION_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        // process.exit(1);
    }
};
