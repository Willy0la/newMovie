import asyncHandler from "express-async-handler";
import constant from "../constants/constant.js";
import userProfile from "../model/userProfile.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import mongoose from "mongoose";

const createNew = asyncHandler(async (req, res, next) => {
  const { name, password, email, username } = req.body;

  if (!name || !username || !password || !email) {
    return res
      .status(constant.BAD_REQUEST)
      .json({ title: "Bad Request", message: "All fields are required" });
  }

  try {
    if (!validator.isEmail(email)) {
      const error = new Error("Invalid Email format");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
    const existingUserByUsername = await userProfile.findOne({ username });
    if (existingUserByUsername) {
      const error = new Error("Username already taken");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }

    const existingUserByEmail = await userProfile.findOne({ email });
    if (existingUserByEmail) {
      const error = new Error("Email already taken");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userProfile({
      name: name,
      email: email,
      password: hashedPassword,
      username: username,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Error creating User", error);
    const customError = new Error("Error creating User");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const getAll = asyncHandler(async (req, res, next) => {
  try {
    const getAllProfile = await userProfile.find();
    if (getAllProfile.length === 0) {
      const error = new Error("No user profile found");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }
    return res
      .status(200)
      .json({ message: "User profile fetched", profile: getAllProfile });
  } catch (error) {
    console.error(error);
    const customError = new Error("Unable to get All profile");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const getOne = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Bad id format");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
    const user = await userProfile.findById(id);
    if (!user) {
      const error = new Error(`User with this userid:${user} does not exist`);
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }
    return res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (error) {
    const customError = new Error(`Unable to fetch user with this userId `);
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Bad ID format");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
    const user = await userProfile.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!user) {
      const error = new Error("User with this ID does not exist ");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }

    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    const customError = new Error("We could not update user");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Bad ID format");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
    const user = await userProfile.findByIdAndDelete(id);

    if (!user) {
      const error = new Error("User with ID does not exist ");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }
    return res.status(200).json({ message: "User deleted", user: user });
  } catch (error) {
    console.error("Error deleting user", error);
    const customError = new Error("Unable to delete user");
    customError.statusCode = constant.Internal_Server_Error;
    return next(customError);
  }
});

export default { createNew, deleteUser, getAll, getOne, updateUser };
