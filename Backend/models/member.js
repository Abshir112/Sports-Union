import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    personalNumber: { type: String, required: true },
}, { collection: 'Member' });

const Member = mongoose.model('Member', memberSchema);

export default Member;
