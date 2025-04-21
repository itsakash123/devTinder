const express=require("express");

const app=express();


// //order of these routes matter a lot
// app.use("/hello", (req, res) => {
//   res.send("hello hello hello");
// });

//these are route handlers
app.use(
  "/user1",[
  (req, res, next) => {
    console.log("Response 1");

    //res.send("Response 1");
    next();
  },
  (req, res, next) => {
    console.log("Response 2");
   // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("Response 3");
    //res.send("Response 3");
    next();
  },
  (req, res,next) => {
    console.log("Response 4");
    res.send("Response 4");
    //next();
    
  }
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
app.delete("/user",(req,res)=>{
  res.send("Data deleted successfully")
})

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
