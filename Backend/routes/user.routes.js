import express from 'express';
import { signUp, signIn } from '../controllers/auth.user.js';
import { deleteUser, getAllUsers, updateUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

/**
 * Route handler to get all users.
 * 
 * @name GET /users
 * @function
 * @memberof userRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userRouter.get('/', getAllUsers);

/**
 * Route handler to get a user by ID.
 * 
 * @name GET /users/:id
 * @function
 * @memberof userRouter
 * @inner
 * @param {express.Request} req - Express request object containing user ID in params.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userRouter.get('/:id', getUserById);

/**
 * Route handler to create a new user.
 * 
 * @name POST /users/sign-up
 * @function
 * @memberof userRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */

userRouter.post('/sign-up', signUp);

/**
 * Route handler to login a user.
 * 
 * @name POST /users/sign-in
 * @function
 * @memberof userRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userRouter.post('/sign-in', signIn);

/**
 * Route handler to update a user.
 * 
 * @name PUT /users/update-user/:id
 * @function
 * @memberof userRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userRouter.put('/update-user/:id', updateUser);

/**
 * Route handler to delete a user.
 * 
 * @name DELETE /users/delete-user/:id
 * @function
 * @memberof userRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userRouter.delete('/delete-user/:id', deleteUser);

export default userRouter;
