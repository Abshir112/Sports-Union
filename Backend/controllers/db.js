import Member from "../models/member.js";
import Activity from "../models/activity.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

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
    
    const {name, email,phone,personalNumber,password } = memberData;
        const hashPassword = bcrypt.hashSync(password, 10)
        const newEmployee = await Member.create({name, email,phone,personalNumber,password:hashPassword});
    try {
        newEmployee.save();
        return newEmployee;
    } catch (error) {
        throw new Error('Failed to add the new employee', error); // Rethrow the error for handling in the caller
    }
};


// Function to login a member with validation
export const signUp = async (memberData) => {
    const {email,password } = memberData;
    try {
        const user = await Member.findOne({email:email});
        if(!user){
            return {error:"User username or password is incorrect"}
        }
        const validePassword = await bcrypt.compare(password, user.password);
        if(!validePassword) return {error:"User username or password is incorrect"}
        return user;
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