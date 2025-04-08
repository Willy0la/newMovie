import mongoose from "mongoose";

const userSche = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must contain at least 8 characters"],
      
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
     
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSche);

export default userModel;
