import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    activityName: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    maxParticipants: { type: Number, required: true }
}, { collection: 'Activity' });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
