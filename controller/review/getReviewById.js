import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Review from "../../model/review.js";

const getReviewById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid review ID.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }
  
  const review = await Review.findById(id)
    .populate("movie")
    .populate("user", "username email");
  
  if (!review) {
    const error = new Error("Review not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }
  
  res.json(review);
});

export default getReviewById;
