import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';


// Function: Sign up and Sign in for the user
export const signUp = async (req,res) => {
    const {name, email, phone, personalNumber, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
        const newEmployee = await User.create({name, email, phone, personalNumber, password: hashPassword});
        return res.status(201).json(newEmployee);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



// Function: Sign in for the user
export const signIn = async (req,res) => {
    const {email,password } = req.body;
    try {
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"User username or password is incorrect"})
        }
        const validePassword = await bcrypt.compare(password, user.password);
        if(!validePassword) return res.status(400).json({error:"User username or password is incorrect"})
        return res.status(200).json("User is logged in successfully");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}