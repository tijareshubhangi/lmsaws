import mongoose from "mongoose"; // Add this line

const connectDB = async () => {
  try {
    // const res = await mongoose.connect("mongodb+srv://jcishubhangitijare:ILXXl1CVFqO5O8Im@lmsproject.tss5d.mongodb.net/");
     const res = await mongoose.connect("mongodb://127.0.0.1:27017/mern-auth-project");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;
 