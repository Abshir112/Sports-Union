import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true, unique: true},
    personalNumber: { type: String, required: false, unique: true},
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user'}
}, { collection: 'User' });


userSchema.statics.signup = async function (email, password, name, phone, personalNumber) {
    if(!email || !password || !name || !phone || !personalNumber) {
        throw new Error('Please fill all the fields');
    }

    if(!validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long and contain at least one lowercase, one uppercase, one number and one special character');
    }

    if(!validator.isMobilePhone(phone)) {
        throw new Error('Invalid phone number');
    }

    if(!validator.isNumeric(personalNumber)) {
        throw new Error('Invalid personal number');
    }

    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        password: hash,
        name,
        phone,
        personalNumber
    });
    return user;
}

userSchema.statics.login = async function (email, password) {
    if(!email || !password) {
        throw new Error('Please provide email and password');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Invalid email');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid password');
    }

    return user;
}

const User = mongoose.model('User', userSchema);

export default User;