import Member from "../models/member.js";
import Activity from "../models/activity.js";
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

// Function to retrieve all members
export const getAllMembers = async () => {
    try {
        const members = await Member.find();
        return members;
    } catch (error) {
        console.error("Error fetching members:", error);
    }
};

// Function to create a new member with validation
export const createMember = async (memberData) => {
    try {
        // Check if the email is already in use
        const existingEmployee = await Member.findOne({ email: employeeData.email });
        if (existingEmployee) {
            throw new Error('Email is already in use');
        }
        const newEmployee = await Employee.create(employeeData);
        return newEmployee;
    } catch (error) {
        throw new Error('Failed to add the new employee', error); // Rethrow the error for handling in the caller
    }
};

// Function to retrieve all activities
export const getAllActivities = async () => {
    try {
        const activities = await Activity.find();
        return activities;
    } catch (error) {
        console.error("Error fetching activities:", error);
    }
};

// Function to create a new activity with validation
export const createActivity = async (activityData) => {
    try {
        const newActivity = await Activity.create(activityData);
        return newActivity;
    } catch (error) {
        throw new Error('Failed to add the new activity', error); // Rethrow the error for handling in the caller
    }
};



