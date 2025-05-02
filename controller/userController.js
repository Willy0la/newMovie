import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import constant from "../constants/constant.js";
import userModel from "../model/user.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";


const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
      const error = new Error("All fields are required");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }

    if (!validator.isEmail(email)) {
      const error = new Error("Invalid Email format");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      const error = new Error(
        "User with this username exists, kindly change it "
      );
      error.statusCode = constant.FORBIDDEN;
      return next(error);
    }

    const existingEmail = await userModel.findOne({ email: email });

    if (existingEmail) {
      const error = new Error("User with this email exists, kindly change it ");

      error.statusCode = constant.FORBIDDEN;

      return next(error);
    }

    const newUser = await userModel.create({
      name,
      username,
      password: hashPassword,
      email,
    });

    const token = jwt.sign({ user: newUser._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    if (!token) {
      const error = new Error("Token not found");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }

    return res.status(201).json({
      title: "User has been registered",
      data: {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    const customError = new Error("User cannot be created");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }


  

  console.log("ACCESS_SECRET:", process.env.ACCESS_TOKEN);
  console.log("REFRESH_SECRET:",process.env.REFRESH_TOKEN);

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

  const accessToken = jwt.sign({ user: existingUser._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ user: existingUser._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
 

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    accessToken,
    username: existingUser.username,
  });
});

const allGet = asyncHandler(async (req, res, next) => {
  try {
    const getAllUsers = await userModel.find();
    if (getAllUsers.length === 0) {
      const error = new Error("No userfound");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }
    return res
      .status(200)
      .json({ message: "All users fetched", users: getAllUsers });
  } catch (error) {
    console.error(error);
    const customError = new Error("Unable to get All profile");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const userById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error(" Bad ID formats");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
    const UserId = await userModel.findById(id);

    if (!UserId) {
      const error = new Error("User not found");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }

    return res.status(200).json({ message: `User found \n \n`, user: UserId });
  } catch {
     console.error("Error fetching User", error);
    const customError = new Error("Unable to fetch User data");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const updateController = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Bad UserId");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }

    return res.status(201).json({ message: "user updated", updatedUser });
  } catch (error) {
    const customError = new Error("Unable to update User");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  console.log("Received cookies:", req.cookies);  // Logs cookies for debugging
  
  if (!token) {
    const error = new Error("Token does not exist");
    error.statusCode = constant.UNAUTHORIZED;
    return next(error);
  }
  
 

  try {
    //verifying the token using refresh token
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN);

    //find user from  the decoded  token exist in the database
    const user = await userModel.findById(decode.user);

    //check if  a user exist  or the user  refresh token matche sthe one stored
    if (!user || user.refreshToken !== token) {
      const error = new Error("Invalid refresh token");
      error.statusCode = constant.UNAUTHORIZED;
      return next(error);
    }

    const newAccessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("JWT verify error:", err);
    const error = new Error("Token verification failed");
    error.statusCode = constant.UNAUTHORIZED;
    return next(error);
  }
});

export default {
  registerUser,
  login,
  allGet,
  userById,
  updateController,
  refreshToken,
};
