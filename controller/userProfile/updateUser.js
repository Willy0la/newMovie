import userProfile from "../../model/userProfile.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
import constant from "../../constants/constant.js";

const updateUser = asyncHandler(async(req, res, next)=>{
try {
    const {id} = req.params 
    const updateData = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error("Bad ID format");
        error.statusCode = constant.BAD_REQUEST
        return next(error)
    }
    const user = await userProfile.findByIdAndUpdate(id, updateData, {new:true})
    if(!user){
        const error = new Error("User with this ID does not exist ")
        error.statusCode = constant.NOT_FOUND
        return next(error)
    }

    return res.status(200).json({message:"User updated",user})
} catch (error) {
     const customError = new Error("We could not update user")
     customError.statusCode = constant.Internal_Server_Error
     return next(customError)
}  
})

export default updateUser;