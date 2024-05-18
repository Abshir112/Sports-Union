import mongoose from 'mongoose';


/**
 * Mongoose schema for the User model.
 * 
 * This schema defines the structure of the User documents stored in the MongoDB database.
 * 
 * @type {mongoose.Schema}
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user (must be unique).
 * @property {string} phone - The phone number of the user (must be unique).
 * @property {string} personalNumber - The personal number of the user (must be unique).
 * @property {string} password - The hashed password of the user.
 * @property {string} [role='user'] - The role of the user (default: 'user').
 * 
 * @param {Object} options - Schema options.
 * @param {string} options.collection - The name of the collection where the user documents will be stored.
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    personalNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' }
}, { collection: 'User' });

/**
 * Static method to sign up a new user.
 * 
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {string} name - The name of the user.
 * @param {string} phone - The phone number of the user.
 * @param {string} personalNumber - The personal number of the user.
 * @returns {Promise<User>} The newly created user object.
 * @throws {Error} Throws an error if any required field is missing, if the email is invalid, if the password is not strong enough, or if the email already exists.
 */
userSchema.statics.signup = async function (email, password, name, phone, personalNumber) {
    if(!email || !password || !name || !phone || !personalNumber) {
        throw new Error('Please fill all the fields');
    }

    if(!validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long and contain a number');
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

/**
 * Static method to log in a user.
 * 
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<User>} The user object if login is successful.
 * @throws {Error} Throws an error if the email is missing, if the email is not found, or if the password is incorrect.
 */
userSchema.statics.login = async function (email, password) {
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
    }};

/**
 * Mongoose model for the User schema.
 * 
 * This model represents the users and provides methods for interacting with the users collection in MongoDB.
 * 
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} phone - The phone number of the user.
 * @property {string} personalNumber - The personal number of the user.
 * @property {string} password - The hashed password of the user.
 * @property {string} [role='user'] - The role of the user.
 * 
 * @returns {mongoose.Model<User>} The User model.
 */
const User = mongoose.model('User', userSchema);

export default User;
