const express = require("express");
const requestRouter = express.Router();

const userAuthentication = require("../middlewares/auth.js");

const ConnectionRequest = require("../models/connectionRequest.js");
const User=require("../models/user.js")

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuthentication,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .send({ message: "Invalid Status Type:" + status });
      }
      

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User Not Found" });
      }
     
      


      //IF there is existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if(existingConnectionRequest){
        return res.
        status(400)
        .send({
          message:"Connection request already exists"
        })
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName+" is " +status +" in "+toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

module.exports = requestRouter;
