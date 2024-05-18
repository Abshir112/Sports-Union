import UserEvent from "../models/users-events.model.js";

/**
 * Retrieves all users' events with user and event details.
 * 
 * @async
 * @function getUserEvents
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of users' events or an error message.
 */
export const getUserEvents = async (req, res) => {
  try {
    const usersEvents = await UserEvent.aggregate([
      {
        $lookup: {
          from: "Event",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          User_ID: "$user._id",
          User_Name: "$user.name",
          Event_ID: "$event._id",
          Event_Name: "$event.title",
        },
      },
    ]);
    res.json(usersEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Retrieves a specific user's events by user ID.
 * 
 * @async
 * @function getUserEvent
 * @param {object} req - Express request object containing user ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the user's events or an error message.
 */
export const getUserEvent = async (req, res) => {
  const userId = req.params.id;

  try {
    const userEvents = await UserEvent.find({ userId: userId });
    res.json(userEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Retrieves users who have the same event by event ID.
 * 
 * @async
 * @function getEventUsers
 * @param {object} req - Express request object containing event ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of users or an error message.
 */
export const getEventUsers = async (req, res) => {
  const eventId = req.params.id;
  try {
    const eventUsers = await UserEvent.find({ eventId: eventId }).populate("userId");
    const users = eventUsers.map((userEvent) => userEvent.userId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Adds an event to a user's events.
 * 
 * @async
 * @function addUserEvent
 * @param {object} req - Express request object containing user ID and event ID in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the created user event or an error message.
 */
export const addUserEvent = async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const userEvent = await UserEvent.create({ userId, eventId });
    res.json(userEvent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Deletes a user event by user ID and event ID.
 * 
 * @async
 * @function deleteUserEvent
 * @param {object} req - Express request object containing user ID and event ID in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 */
export const deleteUserEvent = async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const userEvent = await UserEvent.findOneAndDelete({ userId, eventId });
    if (!userEvent) {
      return res.status(404).json({ message: "User event not found" });
    }
    res.json({ message: "User event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Deletes all user events.
 * 
 * @async
 * @function deleteAllUserEvents
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 */
export const deleteAllUserEvents = async (req, res) => {
  try {
    await UserEvent.deleteMany();
    res.json({ message: "All user events deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
