import Activity from "../models/activity.model.js";

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
