import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true, unique: true},
    personalNumber: { type: String, required: true, unique: true},
    password: { type: String, required: true },
}, { collection: 'Member' });

const Member = mongoose.model('Member', memberSchema);

export default Member;
