

import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const Connectdb = asyncHandler(async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Db connected");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); 
  }
});

export default Connectdb;

