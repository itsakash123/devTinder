const express = require("express");
const connectDB=require("./config/database");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const User=require("./models/user")


//it reads json object  adnd convert into js object and adds js object back to this request object in the body 
app.use(express.json()); //its a middleware

app.post("/signup", async(req,res)=>{

  // console.log(req.body);

  //creating a new instance of user model
  
  const user = new User(req.body);
  try{
   //saving data to the database
    await user.save();
  res.send("User added successfully")
  }catch(err){
    res.status(400).send("Error saving the user :" +err.message)
  }
})




connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be established");
  });


app.use("/admin", adminAuth);
app.use("/user", userAuth);

//you can directly write auth handler here
app.get("/user", userAuth, (req, res) => {
  res.send("user data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("All data deleted");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    //Log you errors
    res.status(500).send("Something Went Wrong");
  }
});

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("abcd");

    res.send("User Data Sent");
  } catch (err) {
     res.status(500).send("Something Went Wrong contact support team");
  }
  
});


//order of these routes matter a lot
app.use("/hello", (req, res) => {
  res.send("hello hello hello");
});

//these are route handlers
app.get("/user2", (req, res, next) => {
  console.log("Handling the route user");
  next();
});
app.get("/user2", (req, res, next) => {
  console.log("Handling the route user");
  res.send("2nd route handler ");
});

//GET/users=>it check for all the app.xxx("matching route:") functions
//whenever a request come to express js server the job of express js server is to go one by one and goes from top to bottom to all  the handlers and the app. function and try to send  response back if it does not find matching url it hangs up
//suppose if  you are sending a request to express server it will try to go one by one check all these methods whatever is matching if it is matching it will go and call this function and it will keep on going one after the middlewares till it reaches the function which actually send the response back which is call request handlet

//GET /users =>middleware chain =>request handlet
app.use("/", (req, res, next) => {
  //Middlewares
  //res.send("Handling /route");
  next();
});
app.use("/user1", [
  (req, res, next) => {
    //Middlewares
    console.log("Response 1");

    //res.send("Response 1");
    next();
  },
  (req, res, next) => {
    //Middlewares
    console.log("Response 2");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    ///request handlet
    console.log("response 3");
    res.send("Response 3");
    mext();
  },
  (req, res) => {
    console.log("Response 4");
    //res.send("Response 4");
    //next();
  },
]);
app.get("/", (req, res) => {
  res.send({ firstName: "Akash", lastName: "shiva" });
});
app.get("/abc", (req, res) => {
  res.send({ firstName: "Akash", lastName: "shiva" });
});
// app.use("/", (req, res) => {
//   res.send("hello namaste from the dashboard");
// });

//this method will match only  GET call  to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Akash", lastName: "Kumar" });
});
// app.use("/user",(req,res)=>{
//   res.send("Hahaha")
// })
app.post("/user", (req, res) => {
  console.log("Save data to the database");
  res.send("Data successfully saved to the database");
});

//This will match all the HTTP method API call to /test
app.use("/test", (req, res) => {
  res.send("hello from the server");
});
app.delete("/user", (req, res) => {
  res.send("Data deleted successfully");
});


