import express from 'express';
import { signUp, signIn } from '../controllers/auth.user.js';
import { getAllMembers } from '../controllers/user.controller.js';


const memberRouter = express.Router();


// Route handler to get all members
memberRouter.get('/', getAllMembers);

// Route handler to create a new member
memberRouter.post('/sign-up',signUp);

//  Route handler to login a member
memberRouter.post('/sign-in', signIn);

export default memberRouter;
