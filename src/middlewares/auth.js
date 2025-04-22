 const adminAuth = (req, res, next) => {
  // Logic of checking if request is authorized
  console.log("Admin auth is being checked");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};
 const userAuth = (req, res, next) => {
   // Logic of checking if request is authorized
   console.log("User auth is being checked");
   const token = "xyz";
   const isAdminAuthorized = token === "xyz";
   if (!isAdminAuthorized) {
     res.status(401).send("Unauthorized request");
   } else {
     next();
   }
 };
module.exports={
    adminAuth,userAuth
}