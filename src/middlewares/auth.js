 const jwt=require("jsonwebtoken");
 const User=require("../models/user")

 const userAuthentication=async(req,res,next)=>{
      //Read the token from req cookies

      try{
        const {token}=req.cookies;
        if(!token){
          return res.status(401).send("Please Login")
        }

      const decodedObj=await jwt.verify(token,"akash@123");

      const {_id}=decodedObj;

      const user=await User.findById(_id);
      if(!user){
        throw new Error("User not found");

      }
      req.user=user;
      next()
    }
    catch(err){
      res.status(400).send("ERROR :" +err.message)
  
    }
 }
 module.exports = userAuthentication;
