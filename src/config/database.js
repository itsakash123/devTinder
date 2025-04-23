const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://akashkumar28955555:t_K4xynzBqY.32H@akashnode.49wlcjx.mongodb.net/devTinder"
  );
};
module.exports=connectDB;
