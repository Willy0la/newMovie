import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import userProfile from "../../model/userProfile.js";
import bcrypt from "bcryptjs";
import validator from "validator"

const createNew = asyncHandler(async (req, res, next) => {
  const { name, password, email, username } = req.body;

  if (!name || !username || !password || !email) {
    return res
      .status(constant.BAD_REQUEST)
      .json({ title: "Bad Request", message: "All fields are required" });
  }

  try {
  
    if(!validator.isEmail(email)){
      const error = new Error("Invalid Email format")
      error.statusCode =constant.BAD_REQUEST
       return next(error)
    }
    const existingUserByUsername = await userProfile.findOne({ username });
    if (existingUserByUsername) {
      const error = new Error("Username already taken")
        error.statusCode = constant.BAD_REQUEST
      return next(error)
    }

    const existingUserByEmail = await userProfile.findOne({ email });
    if (existingUserByEmail) {
      const error = new Error("Email already taken")
      error.statusCode = constant.BAD_REQUEST
      return next(error)
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
    console.error("Error creating User",error)
    const customError = new Error("Error creating User")
    customError.statusCode = constant.Internal_Server_Error
  return next(customError)
  }
});

export default createNew;
