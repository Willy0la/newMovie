

import bcrypt from "bcryptjs";
import express from "express";
import userModel from "../../model/user.js";
import constant from "../../constants/constant.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      const error = new Error("All fields are required");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }

    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      const error = new Error("User with username not found");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }

    if (existingUser.email !== email) {
      const error = new Error("Unauthorized user");
      error.statusCode = constant.UNAUTHORIZED;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      const error = new Error("Invalid password");
      error.statusCode = constant.UNAUTHORIZED;
      return next(error);
    }

    const token = jwt.sign(
      { user: existingUser.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: existingUser.username,
    });
  } catch (error) {
    console.error(error);
    const customError = new Error("Unable to login user");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});


export default login;
