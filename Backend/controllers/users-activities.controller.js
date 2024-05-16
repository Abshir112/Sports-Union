import UserActivity from '../models/users-activities.model.js';


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


// function to find user's activities
export const getUserActivity = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        const userActivities = await UserActivity.find({ userId: userId })
        res.json(userActivities);
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

// function to add an activity to the users activities (register for an activity)
export const createUserActivity = async (req, res) => {
    const { userId, activityId } = req.body;
    try {
        const userActivity = await UserActivity.create({ userId, activityId });
        res.status(201).json(userActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// function to delete a user activity (unregister from an activity)
export const deleteUserActivity = async (req, res) => {
    const { userId, activityId } = req.body;
    try {
        const userActivity = await UserActivity.findOneAndDelete({ userId, activityId });
        if (!userActivity) {
            return res.status(404).json({ message: 'User activity not found' });
        }
        res.json(userActivity);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// function to delete all user activities (unregister from all activities)
export const deleteAllUserActivities = async (req, res) => {
    try {
        await UserActivity.deleteMany({});
        res.json({ message: 'All user activities deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

