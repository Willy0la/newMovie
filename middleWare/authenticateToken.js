import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import constant from "../constants/constant.js";

const authToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("No token provided");
    error.statusCode = constant.UNAUTHORIZED;
    return next(error);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      const error = new Error("Token is Invalid");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
    req.user = user;
    next();
  });
});

export default authToken;
