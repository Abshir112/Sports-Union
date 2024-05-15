import mongoose from 'mongoose';


const userEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true}
}, { collection: 'userEvent' });

const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;