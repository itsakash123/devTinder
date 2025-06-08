const express = require("express");
const userRouter = express.Router();
const userAuthentication = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "gender",
  "age",
  "about",
  "skills",
  "photoURL"
];
//Get all the pending connection request for the loggedIn user
userRouter.get(
  "/user/requests/received",
  userAuthentication,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", USER_SAFE_DATA);

      res.json({
        message: "Data fetched succcessfully",
        data: connectionRequests,
      });
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }
  }
);
userRouter.get("/user/connections", userAuthentication, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
userRouter.get("/feed", userAuthentication, async (req, res) => {
  try {
    // User should see all user cards except
    //1. his own card
    //2. his connections
    //3. ignored people
    //4. already sent the connection request
    const loggedInUser = req.user;
    const page=parseInt(req.query.page) || 1;
    let limit=parseInt(req.query.limit) || 10;
    limit=limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;


    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
   // console.log(hideUsersFromFeed);

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, //notinthisarray
        { _id: { $ne: loggedInUser._id } }, //notequalto
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.json({data:users})

    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
