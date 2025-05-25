const express=require("express");
const authRouter=express.Router();
const { validateSignUpData } = require("../utils/validation"); 
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    // Encrypt the password

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // console.log(req.body);

    //creating a new instance of user model

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    //saving data to the database
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);    if (isPasswordValid) {
      //create a JWT token

      const token = await user.getJWT();
     
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      //Add the token to cookie and send the response back to the user

      res.send("Login Successful!!");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});
authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("Logout Successfull")
})
module.exports=authRouter;