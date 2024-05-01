import express from 'express';
import { signUp, signIn } from '../controllers/auth.user.js';
import { deleteUser, getAllUsers, updateUser } from '../controllers/user.controller.js';


const memberRouter = express.Router();


// Route handler to get all members
memberRouter.get('/', getAllUsers);

// Route handler to create a new member
memberRouter.post('/sign-up',signUp);

//  Route handler to login a member
memberRouter.post('/sign-in', signIn);
// Route handler to update a member
memberRouter.put('/update-user/:id', updateUser);
// Route handler to delete a member
memberRouter.delete('/delete-user/:id', deleteUser);

export default memberRouter;
