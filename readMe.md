-whenever you type some url you are making get API call to this route on our server ex https://localhost3000/xyz

-for testing our API broswer is not a good way there is a software Postman

- install postman app and make a workspace/collection->test API call

- Write logic to handle GET,POST,PATCH,UPDATE,DELETE API calls and test them on postman

- MULTIPLE ROUTE HANDLERS
- next();
- next function and errors along with res.send()
- app.use("/route",rH,[rH2,rH3],rH4,rH5);
- What is middleware ?why do we need it?
- how express JS basically handles request behind the scene?
- write dummy auth middleware for admin
- write a dummy auth middleware for all user routes,except /user/login
- Error handling using app.use("/",(err,req,res,next)={})

- Create a free cluster(contains many databases) on MongoDB official website(Mongo Atlas)
- Install mongoose library
- Connect your pplicstion to the Databse "connection-url"/devTinder
- call the connectDB function and connect to database before starting application on 3000
- Create a userSchema and user Model

- cluster ->Database->collection->documents ->fields 

- Create a POST /signup API to add data to the database
- push some documents using API calls from postman
- Error Handling using try catch

- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
 -API -get user bt email
 - API - feed API -get all the users from the database;
 - Create a delete user API
- update the user with emailId;

-add required,unique,trim,min,lowercase,minLength
-Add default
- Create a custom validate function for gender
-Add timestamps to userSchema