const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18,
    
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid")
      }
    }
  },
  photoURL: {
    type: String,
    default:
      "https://manmohinihealthcare.com/wp-content/uploads/2019/07/dummy-user.jpg",
  },
  about: {
    type: String,
    default: "This is default about of the user",
  },
  skills: {
    type: [String],
  },
},{
  timestamps:true
});



module.exports = mongoose.model("User", userSchema);
