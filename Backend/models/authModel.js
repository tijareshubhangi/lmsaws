import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Admin", "Student"],
    default: "Student",
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  images: [
    {
      filename: {
        type: String,
        required: true,
      },
    },
  ],
  firstNameAdmin: {
    type: String,
    default: "",
  },
  lastNameAdmin: {
    type: String,
    default: "",
  },
  firstNameStudent: {
    type: String,
    default: "",
  },
  lastNameStudent: {
    type: String,
    default: "",
  },
  

});


const authModel = mongoose.model("user", authSchema);
export default authModel;
