import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true, unique: true},
    personalNumber: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user'}
}, { collection: 'User' });

const User = mongoose.model('User', userSchema);

export default User;
