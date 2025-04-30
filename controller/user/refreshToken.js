import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import jwt from "jsonwebtoken";
import userModel from "../../model/user.js";

const REFRESH_SECRET = process.env.REFRESH_TOKEN;
const ACCESS_SECRET = process.env.ACCESS_TOKEN;

const refreshToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    const error = new Error("Token doesn not exist");
    error.statusCode = constant.UNAUTHORIZED;
    next(error);
  }

  try {
    //verifying the token using refresh token
    const decode = jwt.verify(token, REFRESH_SECRET);

    //find user from  the decoded  token exist in the database
    const user = await userModel.findById(decode.user);

    //check if  a user exist  or the user  refresh token matche sthe one stored
    if (!user || user.refreshToken !== token) {
      const error = new Error("Invalid refresh token");
      error.statusCode = constant.UNAUTHORIZED;
      return next(error);
    }

    const newAccessToken = jwt.sign({ user: user._id }, ACCESS_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("JWT verify error:", err);
    const error = new Error("Token verification failed");
    error.statusCode = constant.UNAUTHORIZED;
    return next(error);
  }
});

export default refreshToken;
