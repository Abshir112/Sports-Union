import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    activityName: { type: String, required: true },
    date: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image : { type: String, required: false },
    currentParticipants: { type: Number, required: true },
    time: { type: String, required: true }

}, { collection: 'Activity' });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
