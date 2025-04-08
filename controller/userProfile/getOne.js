import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import userProfile from "../../model/userProfile.js";
import mongoose from "mongoose";
const getOne = asyncHandler(async (req, res, next) => {
  
try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error("Bad id format") 
        error.statusCode = constant.BAD_REQUEST
        return next(error)
      }
      const user = await userProfile.findById(id)
      if(!user){
        const error = new Error(`User with this userid:${user} does not exist`)
        error.statusCode = constant.NOT_FOUND
        return next(error)
      }
      return res.status(200).json({
        message: "User found successfully",
        user,
      });
  
} catch (error) {
    const customError = new Error(`Unable to fetch user with this userId `)
    customError.statusCode = constant.Internal_Server_Error
    return next(customError)
}
  
});

export default getOne