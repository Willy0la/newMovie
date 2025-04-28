import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import constant from "../constants/constant.js";

const authToken = asyncHandler(async (req, res, next) => {
 
  //check if there is "Authorization " in the http REq
const authHeader = req.get("Authorization")


// check if authorization field was gotten in the the http

if(!authHeader || !authHeader.startsWith("Bearer ")){

  const error = new Error ("No token found, Authorization denied")
  error.statusCode = constant.UNAUTHORIZED
  return next (error)
}

// this takes out the token its self and ignores the bearer
  const token = authHeader.split(" ")[1]

  try {

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN )
    req.user = decode

   return next()
    
  } catch (error) {
    const customError = new Error("Token  is invalid")

    customError.statusCode = constant.BAD_REQUEST 
   return next(customError)
  }


  });

export default authToken;
