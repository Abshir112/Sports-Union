import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true}
}, { collection: 'userActivity' });

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;
