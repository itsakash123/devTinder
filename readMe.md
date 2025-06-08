1-create an account
2-login
3-update your profilw
4-Feed Page-explore (giving you the data of other users)
5-send connection request
6-see our matches
7-see the request we have sent/recieved

LLD
# DB Design

- User Collection - stores only user Data like -firstName lastName emailID password
- Connection Request -from UserID  -toUserID  -status=PENDING

# API DESIGN (REST API)
 you have a frontend application and backend application how frontend will communicate with backend application 

 for example -frontend have emailID ,password it will call /login API in backend.this login api will talk to the database  and see whether emailID ,password exist  or not then login api will send the response it can be failed or success

 email,passoword-> /login api ->database(request)
 database->loginAPI->email,password(response)


# REST API'S
  CRUD OPERATIONS 

 GET -> TO GET DATA ROM THE DATABASE  /PROFILE  /REQUESTS   /CONNECTIONS

 POST ->PUT SOME DATA IN THE DATABASE  /SIGN UP  /LOGIN  /SEND REQUEST   /REVIEW REQUEST(ACCEPT OR REJECT)

PATCH AND PUT ->UPDATE THE DATA  /PROFILE

 DELETE ->DELETE THE DATA


-npm init ->initilaize project
-make src folder -> app.js
install express js  
whenever you write npm i express.js it gets the code  from the intenet and put into nodemodules so we can use it

express - 4.19.3 (major.minor.patch)
minor is backend compatible and major is breaking change.be careful with major change

^4.19.3 if tomorrow new update comes 4.x.x then my project will be autoupdate



when you listen() on the server you accept incoming request
app.listen(3000) 3000 is port

nodemon automatically refresh the server

we will be using express js for creating the server

- order of routes matter a lot





- whenever you type some url you are making get API call to this route on our server ex https://localhost3000/xyz

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

- Add required,unique,trim,min,lowercase,minLength
- Add default
- Create a custom validate function for gender
-Add timestamps to userSchema

-Add API level validation on Patch request & SignUp post api
- DATA Sanitizing-Add api validation for each field

- Install validator npm
- Explore validator library functions and use Validator functions for password ,email,photoURL
- Never Trust req.body

- validate data in signup API
- Install bcrypt package
- Create password Hash using bcrypt.hash & save the user with encrypted password
- Create Login API 
- Compare password and throw errors if email or password is invalid


- whenever  a user is login in , server will create a token ( json web token)attached it in to a cokkie and send back in the response now that cookie will be stored by browser and  any req that is coming back next, that cokkie will be send along and we will validate it once again and do anything whatever we want

- to read the cookie we need a middleware cookie parser from npm

whenver you are login in  as soon as you hit login api It will set token inside cookie and will give youu the cookie now it is job of the client (browser)  the job of browser is to read the cookie and keep it safely whenever i am requesting any other api call please send back the cookie whenever i am making any other api call
- Install cookie parser
- just send dummy cookie to user
- Create GET /profile API and check if you get cookie back
- Install json web token
- In login API after email and password verification ,create a JWT token and send it to user inside cookies
- read the cookie inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days;
- Create userchema  method to getJWT();

- Group multiple routes under respective routes
- Create routes folder for managing auth,profile,request routers
- Create authRouter ,ProfileRouter, requestRouter 
- Import these router in app.js
- Create POST /logout API
- Create PATCH /profile/edit
-Make vakidate all data in every POST,PATCH api
-create connection request schema
-send connection request API

- POST VS GET  
- POST API  means user is trying to enter some data into database 
we have to verify everthing that is coming in our database
user can malicuously enter wrong data in databse
-GET API means i am trying to fetch data from database
in GET API you are sure what you are sending back to the user

- Create GET /user/requests/recieved with all the checks
- Create GET /user/connections

- Create GET /feed API
 explore $or, $min , $and and other query operators


 /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

 /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

 /feed?page=3&limit=10 => 21 -30 => .skip(20) & .limit(10)

 skip= (page-1)*limit

 .skip() & .limit()








