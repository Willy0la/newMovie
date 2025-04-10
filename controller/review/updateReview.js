import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Review from "../../model/review.js";

const updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid review ID.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }
  
  const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
  
  if (!updatedReview) {
    const error = new Error("Review not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }
  
  
  const populatedReview = await Review.findById(updatedReview._id)
    .populate("movie")
    .populate("user", "username email");

  res.json({
    message: "Review updated successfully.",
    review: populatedReview,
  });
});

export default updateReview;
