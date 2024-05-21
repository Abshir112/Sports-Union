import User from '../models/user.model.js';  
import Activity from '../models/activity.model.js';
import Notification from '../models/notification.model.js';
import Event from '../models/event.model.js';
import userActivitySchema from '../models/users-activities.model.js';
import userEventSchema from '../models/users-events.model.js';


export const getStatistics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalActivities = await Activity.countDocuments({});
        const totalEvents = await Event.countDocuments({});
        const totalReservedActivities = await userActivitySchema.countDocuments({});
        const totalReservedEvents = await userEventSchema.countDocuments({});
        const totalAnnouncement = await Notification.countDocuments({});

        res.status(200).json({
            totalUsers,
            totalActivities,
            totalEvents,
            totalReservedActivities,
            totalReservedEvents,
            totalAnnouncement
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
