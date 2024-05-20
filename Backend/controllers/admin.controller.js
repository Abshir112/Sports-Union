import User from '../models/user.model.js';  
import Activity from '../models/activity.model.js';
import Notification from '../models/notification.model.js';
import Event from '../models/event.model.js';

export const getStatistics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalActivities = await Activity.countDocuments({});
        const totalEvents = await Event.countDocuments({});
        const totalReservedActivities = await Activity.countDocuments({ currentParticipants: { $gt: 0 } });
        const totalReservedEvents = await Event.countDocuments({ currentParticipants: { $gt: 0 } });
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
