import express from "express";
import { getUserEvents, getUserEvent, getEventUsers, addUserEvent, deleteUserEvent } from "../controllers/users-events.controller.js";

const userEventRouter = express.Router();

/**
 * Route handler to get all user events.
 * 
 * @name GET /user-events
 * @function
 * @memberof userEventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userEventRouter.get("/", getUserEvents);

/**
 * Route handler to get events of a single user by ID.
 * 
 * @name GET /user-events/:id
 * @function
 * @memberof userEventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userEventRouter.get("/:id", getUserEvent);

/**
 * Route handler to get users who have the same event.
 * 
 * @name GET /user-events/get-users/:id
 * @function
 * @memberof userEventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userEventRouter.get("/get-users/:id", getEventUsers);

/**
 * Route handler to create a new user event.
 * 
 * @name POST /user-events/user-event
 * @function
 * @memberof userEventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userEventRouter.post("/user-event", addUserEvent);

/**
 * Route handler to delete a user's event.
 * 
 * @name DELETE /user-events
 * @function
 * @memberof userEventRouter
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
userEventRouter.delete("/", deleteUserEvent);

export default userEventRouter;
