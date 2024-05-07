import UserActivity from '../models/users-activities.model.js';
import Activity from '../models/activity.model.js';


// function to get all users activities
export const getUserActivities = async (req, res) => {
    try {
        const usersActivities = await UserActivity.aggregate([
            {
              $lookup: {
                from: 'Activity',
                localField: 'activityId',
                foreignField: '_id',
                as: 'activity'
              }
            },
            {
              $lookup: {
                from: "User",
                localField: "userId",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $unwind: "$activity"
            },
            {
              $unwind: "$user"
            },
            {
              $project: {
                User_ID: "$user._id",
                User_Name: "$user.name",
                Activity_ID: "$activity._id",
                Activity_Name: "$activity.activityName",
              }
            }
          ]);
        res.json(usersActivities);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// function to find user's acktivities
export const getUserActivity = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        const userActivities = await UserActivity.find({ userId: userId }).populate('activityId');
        const activities = userActivities.map(userActivity => userActivity.activityId);
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// function to get known which which users have the same activity
export const getUsersWithSameActivity = async (req, res) => {
    const activityId = req.params.id;
    try {
        const userActivities = await UserActivity.find({ activityId: activityId }).populate('userId');

        if (userActivities.length === 0) {
            return res.status(404).json({ message: 'No users found with the specified activity' });
        }
        const users = userActivities.map(userActivity => ({
            name: userActivity.userId.name,
            phone: userActivity.userId.phone,
            id: userActivity.userId._id,
            email: userActivity.userId.email,
        }));
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// function to create a new user activity
export const createUserActivity = async (req, res) => {
    const {activityName, scheduledTime, maxParticipants} = req.body;
    console.log(req.body);
    try {
        const newActivity = await Activity.create({activityName, scheduledTime, maxParticipants});
        // const activityId = newActivity._id;
        // const userId = req.user._id;
        // await UserActivity.create({userId ,activityId});
        return res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

