import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import constant from "../../constants/constant.js";
import userModel from "../../model/user.js";
import bcrypt from "bcryptjs";
import validator from "validator"

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
      const error = new Error("All fields are required");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }

     if(!validator.isEmail(email)){
          const error = new Error("Invalid Email format")
          error.statusCode =constant.BAD_REQUEST
          return next(error)
        }

    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await userModel.findOne({username});

    if (existingUser) {
      const error = new Error(
        "User with this username exists, kindly change it "
      );
      error.statusCode = constant.FORBIDDEN;
      return next(error);
    }

    const existingEmail = await userModel.findOne({email});

    if (existingEmail) {
      const error = new Error("User with this email exists, kindly change it ");

      error.statusCode = constant.FORBIDDEN;

      return next(error);
    }
    const newUser = await  userModel.create({
       name,
    username,
      password: hashPassword,
     email,
    });


    return res.status(201).json({title:"User registered", message: newUser})
  } catch (error) {
    const customError = new Error("User cannot be created");
    customError.statusCode = constant.Internal_Server_Error
   return next(customError)
  }
});

export default registerUser;
