import express from "express";
import { getUserEvents, getUserEvent, getEventUsers, addUserEvent, deleteUserEvent } from "../controllers/users-events.controller.js";

const userEventRouter = express.Router();

// Route handler to get all user events
userEventRouter.get("/", getUserEvents);

// Route handler to get a single user's events
userEventRouter.get("/get-events/:id", getUserEvent);

// Route handler to get users have the same events
userEventRouter.get("/get-users/:id", getEventUsers);

// Route handler to create a new user event
userEventRouter.post("/user-event", addUserEvent);

// Route handler to delete a user's event
userEventRouter.delete("/:id", deleteUserEvent);


export default userEventRouter;