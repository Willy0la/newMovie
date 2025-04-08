import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: false,
    },
    username: {
      type: String,
      required: [true, "Username is required"], 
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: false,
      minlength: [8, "Password must contain at least 8 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"], 
      unique: true,
    },
  },
  { timestamps: true } 
);

const userProfile = mongoose.model("movieReviewer", userSchema);

export default userProfile;
