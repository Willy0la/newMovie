import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import userProfile from "../../model/userProfile.js";
import mongoose from "mongoose";


const getAll = asyncHandler(async(req,res,next)=>{
   try {
    const getAllProfile = await userProfile.find()
    if(getAllProfile.length === 0){

        const error = new Error("No user profile found")
        error.statusCode = constant.NOT_FOUND
        return next(error)

    
    }
    return res.status(200).json({message:"User profile fetched",profile:getAllProfile})
   } catch (error) {
    console.error(error)
    const customError = new Error("Unable to get All profile")
    customError.statusCode = constant.Internal_Server_Error
    return next (customError)
   
   }

    
   
})

export default getAll