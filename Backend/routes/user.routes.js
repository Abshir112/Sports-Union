import express from 'express';
import { signUp, signIn } from '../controllers/auth.user.js';
import { deleteUser, getAllUsers, updateUser } from '../controllers/user.controller.js';


const userRouter = express.Router();


// Route handler to get all users
userRouter.get('/', getAllUsers);

// Route handler to create a new user
userRouter.post('/sign-up',signUp);

//  Route handler to login a user
userRouter.post('/sign-in', signIn);
// Route handler to update a user
userRouter.put('/update-user/:id', updateUser);
// Route handler to delete a user
userRouter.delete('/delete-user/:id', deleteUser);

export default userRouter;
