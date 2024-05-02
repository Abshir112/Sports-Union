import Activity from "../models/activity.model.js";


// Function to retrieve all activities
export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to create a new activity
export const createActivity = async (req, res) => {
    try {
        const newActivity = await Activity.create(req.body);
        res.status(201).json(newActivity);
    } catch (error) {
        console.error('Failed to create activity:', error);
        res.status(500).json({ error: 'Failed to create activity' });
    }
};

// Function to update an activity
export const updateActivity = async (req, res) => {
    const { id } = req.params;
    const { activityName, scheduledTime, maxParticipants } = req.body;
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            id,
            { activityName, scheduledTime, maxParticipants },
            { new: true }
        );
        if (!updatedActivity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(updatedActivity);
    } catch (error) {
        console.error('Failed to update activity:', error);
        res.status(500).json({ error: 'Failed to update activity' });
    }
};


// Function to delete an activity
export const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Failed to delete activity:', error);
        res.status(500).json({ error: 'Failed to delete activity' });
    }
};

