import UserActivity from '../models/users-activities.model.js';
import Activity from '../models/activity.model.js';

/**
 * Retrieves all users' activities with user and activity details.
 * 
 * @async
 * @function getUserActivities
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of users' activities or an error message.
 */
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

/**
 * Retrieves a specific user's activities by user ID.
 * 
 * @async
 * @function getUserActivity
 * @param {object} req - Express request object containing user ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the user's activities or an error message.
 */
export const getUserActivity = async (req, res) => {
    const userId = req.params.id;
    try {
        const userActivities = await UserActivity.find({ userId: userId });
        res.json(userActivities);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Retrieves users who have the same activity by activity ID.
 * 
 * @async
 * @function getUsersWithSameActivity
 * @param {object} req - Express request object containing activity ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of users or an error message.
 */
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

/**
 * Adds an activity to a user's activities (register for an activity).
 * 
 * @async
 * @function createUserActivity
 * @param {object} req - Express request object containing user ID and activity ID in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the created user activity or an error message.
 */
export const createUserActivity = async (req, res) => {
    const { userId, activityId } = req.body;
    try {
        const userActivity = await UserActivity.create({ userId, activityId });
        await Activity.findByIdAndUpdate(activityId, { $inc: { availableSpots: -1, currentParticipants: 1} }, { new: true });
        res.status(201).json(userActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Deletes a user activity (unregister from an activity).
 * 
 * @async
 * @function deleteUserActivity
 * @param {object} req - Express request object containing user ID and activity ID in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the deleted user activity or an error message.
 */
export const deleteUserActivity = async (req, res) => {
    const { userId, activityId } = req.body;
    try {
        const userActivity = await UserActivity.findOneAndDelete({ userId, activityId });
        if (!userActivity) {
            return res.status(404).json({ message: 'User activity not found' });
        }
        await Activity.findByIdAndUpdate(activityId, { $inc: { availableSpots: 1, currentParticipants: -1 } }, { new: true });
        res.json(userActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Deletes all user activities (unregister from all activities).
 * 
 * @async
 * @function deleteAllUserActivities
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 */
export const deleteAllUserActivities = async (req, res) => {
    try {
        await UserActivity.deleteMany({});
        res.json({ message: 'All user activities deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
