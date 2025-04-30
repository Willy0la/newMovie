import bcrypt from "bcryptjs";
import express from "express";
import userModel from "../../model/user.js";
import constant from "../../constants/constant.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const REFRESH_SECRET = process.env.REFRESH_TOKEN
const ACCESS_SECRET = process.env.ACCESS_TOKEN

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  console.log("ACCESS_SECRET:", ACCESS_SECRET);
console.log("REFRESH_SECRET:", REFRESH_SECRET);


  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    const error = new Error("Invalid password");
    error.statusCode = constant.UNAUTHORIZED;
    return next(error);
  }

  const accessToken = jwt.sign({user:existingUser._id}, ACCESS_SECRET, {expiresIn:"15m"})
  const refreshToken = jwt.sign({user:existingUser._id}, REFRESH_SECRET, {expiresIn:"7d"})

  existingUser.refreshToken = refreshToken
  await existingUser.save()

  res.cookie("refreshToken", refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge: 7*24*60*60*1000


  })
  
 

  res.status(200).json({
    message: "Login successful",
    accessToken,
    username: existingUser.username,
  });
});

export default login;
