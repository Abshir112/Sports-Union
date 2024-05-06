import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}


// Function: Sign up and Sign in for the user
export const signUp = async (req, res) => {
    // const {name, email, phone, personalNumber, password} = req.body;
    // const hashPassword = bcrypt.hashSync(password, 10);
    // try {
    //     const newEmployee = await User.create({name, email, phone, personalNumber, password: hashPassword});
    //     return res.status(201).json(newEmployee);
    // } catch (error) {
    //     return res.status(500).json({ error: error.message });
    // }

    const {name, email, phone, personalNumber, password} = req.body;
    try {
        const user = await User.signup(email, password, name, phone, personalNumber);

        const token = createToken(user._id);

        res.status(201).json({user, token});
        
    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
}



// Function: Sign in for the user
export const signIn = async (req,res) => {
    const {email,password } = req.body;
    // try {
    //     const user = await User.findOne({email:email});
    //     if(!user){
    //         return res.status(400).json({error:"User username or password is incorrect"})
    //     }
    //     const validePassword = await bcrypt.compare(password, user.password);
    //     if(!validePassword) return res.status(400).json({error:"User username or password is incorrect"})
    //     return res.status(200).json("User is logged in successfully");
    // } catch (error) {
    //     return res.status(500).json({ error: error.message });
    // }

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}