//login controller
import bcrypt from "bcryptjs";
import express from "express";
import userModel from "../../model/user.js";
import constant from "../../constants/constant.js";
import asyncHandler from "express-async-handler";

const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    //
    if (!email || !password || !username) {
      const error = new Error("All fields are required");
      error.statusCode = constant.BAD_REQUEST;
      next(error);
    }

    const existingUser = await userModel.findOne({username})
  
    if(!existingUser){
        const error = new Error("User with userName not found")
        error.statusCode = constant.NOT_FOUND
        return next(error)
    }

    if(existingUser.email !== email){
        const error = new Error("Unauthourised User")
        error.statusCode = constant.UNAUTHORIZED
        return next(error)
    }

    const isMatch = bcrypt.compare(password, existingUser.password)

    if(!isMatch){
        const error = new Error(" Invalid Password")
        error.statusCode = constant.UNAUTHORIZED
        return next(error) 
    }

  } catch (error) {
    const customError = new Error ("Unable to login user")
    customError.statusCode = constant.Internal_Server_Error
    return next(customError);
  }
});

export default login