import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import userModel from "../../model/user.js";
import mongoose from "mongoose";


const allGet = asyncHandler(async(req,res,next)=>{
   try {
    const getAllUsers = await userModel.find()
    if(getAllUsers.length === 0){

        const error = new Error("No userfound")
        error.statusCode = constant.NOT_FOUND
        return next(error)

    
    }
    return res.status(200).json({message:"All users fetched",users:getAllUsers})
   } catch (error) {
    console.error(error)
    const customError = new Error("Unable to get All profile")
    customError.statusCode = constant.Internal_Server_Error
    return next (customError)
   
   }

    
   
})

export default allGet