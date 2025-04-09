
import bcrypt from "bcryptjs";
import express from "express";
import userModel from "../../model/user.js";
import constant from "../../constants/constant.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose"

const userById = asyncHandler(async (req, res, next)=>{
    const {id} = req.params

    try{if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error(" Bad ID formats")
        error.statusCode = constant.BAD_REQUEST
        return  next(error);
    }
    const UserId = await userModel.findById(id)
 
    if(!UserId){
        const error = new Error("User not found")
        error.statusCode = constant.NOT_FOUND
        return  next(error); 
    }

    return res.status(200).json({message:`User found \n \n`, user:UserId})

}catch{
    console.error("Error fetching User",error)
    const customError = new Error("Unable to fecth  data User")
    customError.statusCode = constant.Internal_Server_Error
  return next(customError)

}
    
      
}) 


export default userById