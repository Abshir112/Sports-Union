import UserEvent from "../models/users-events.model.js";

// function to get all users events
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

// function to find user's events
export const getUserEvent = async (req, res) => {
  const userId = req.params.id;

  try {
    const userEvents = await UserEvent.find({ userId: userId });
    res.json(userEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// function to get known which which users have the same event
export const getEventUsers = async (req, res) => {
  const eventId = req.params.id;
  console.log(eventId);
  try {
    const eventUsers = await UserEvent.find({ eventId: eventId }).populate(
      "userId"
    );
    const users = eventUsers.map((userEvent) => userEvent.userId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// function to add user's event
export const addUserEvent = async (req, res) => {
    const { userId, eventId } = req.body;
    console.log(userId, eventId);
    try {
        const userEvent = await UserEvent.create({ userId, eventId });
        res.json(userEvent);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// function to delete a user event
// export const deleteUserEvent = async (req, res) => {
//   const { userId, eventId } = req.body;
//   console.log(userId, eventId);
//   try {
//     await UserEvent.findOneAndDelete({ userId: userId, eventId: eventId });
//     res.json({ message: "User event deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// function to delete a user event by id
export const deleteUserEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    console.log(userId, eventId);
    const userEvent = await UserEvent.findOneAndDelete({ userId, eventId });
    if (!userEvent) {
      return res.status(404).json({ message: "User event not found" });
    }
    res.json({ message: "User event deleted successfully" });
    } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    }
}



// function to delete all user events
export const deleteAllUserEvents = async (req, res) => {
  try {
    await UserEvent.deleteMany();
    res.json({ message: "All user events deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};