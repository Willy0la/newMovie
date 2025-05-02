import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import constant from "../constants/constant.js";

const authToken = asyncHandler(async (req, res, next) => {
  // Check if there's an "Authorization" header in the request
  const authHeader = req.get("Authorization");

  // Check if the Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("No token found, Authorization denied");
    error.statusCode = constant.UNAUTHORIZED;
    return next(error);
  }

  console.log("Authorization Header:", authHeader);
  // Extract the token by splitting the "Bearer <token>" string
  const token = authHeader.split(" ")[1]?.trim();

  try {
    // Log the secret to check if it's correctly loaded
    console.log("ACCESS_TOKEN secret:", process.env.ACCESS_TOKEN);

    if (!process.env.ACCESS_TOKEN) {
      const error = new Error("ACCESS_TOKEN secret is missing in .env");
      error.statusCode = constant.Internal_Server_Error;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    
    // Attach the decoded user info to the request object
    req.user = decoded;

    return next();
  } catch (error) {
    console.error("JWT verify error:", error.message); // Log the actual error message
    const customError = new Error("Token is invalid or expired");

    customError.statusCode = constant.BAD_REQUEST;
    return next(customError);
  }
});

export default authToken;
