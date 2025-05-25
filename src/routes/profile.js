const express = require("express");

const profileRouter = express.Router();
const userAuthentication = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuthentication, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuthentication, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({message:`${loggedInUser.firstName},Your Profile is updated successfully"`,data:loggedInUser});
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});
module.exports = profileRouter;
