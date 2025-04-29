import userModel from "../../model/user.js";
import constant from "../../constants/constant.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const updateController = asyncHandler(async (req, res, next) => {

  try {
    const {id }= req.params;

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

export default updateController;
