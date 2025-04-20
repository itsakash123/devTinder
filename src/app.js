const express=require("express");

const app=express();
app.use(express.json());

// //order of these routes matter a lot
// app.use("/hello", (req, res) => {
//   res.send("hello hello hello");
// });

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

app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000....")
});
