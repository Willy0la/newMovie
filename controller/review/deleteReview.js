import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Review from "../../model/review.js";

const deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid review ID.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }
  
  const deletedReview = await Review.findByIdAndDelete(id);
  
  if (!deletedReview) {
    const error = new Error("Review not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }
  
  res.json({
    message: "Review deleted successfully.",
  });
});

export default deleteReview;
