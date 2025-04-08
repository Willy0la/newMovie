import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import userProfile from "../../model/userProfile.js";
import mongoose from "mongoose";

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
    return res.status(200).json({message:"User deleted", user:user})
  } catch (error) {
    console.error("Error deleting user", error)
    const customError = new Error("Unable to delete user");
      customError.statusCode = constant.Internal_Server_Error;
      return next(customError);
  }
});

export default deleteUser
