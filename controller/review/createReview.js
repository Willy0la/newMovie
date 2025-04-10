import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Review from "../../model/review.js"; 
import Movie from "../../model/movie.js";
import User from "../../model/user.js";

const createReview = asyncHandler(async (req, res, next) => {
  const { movie, user, rating, reviewText } = req.body;

  
  if (!mongoose.Types.ObjectId.isValid(movie)) {
    const error = new Error("Invalid movie ID.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  if (!mongoose.Types.ObjectId.isValid(user)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    const error = new Error("Rating must be a number between 1 and 5.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

 
  if (reviewText && reviewText.trim().length === 0) {
    const error = new Error("Review text cannot be empty if provided.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  
  const foundMovie = await Movie.findById(movie);
  if (!foundMovie) {
    const error = new Error("Movie not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  
  const foundUser = await User.findById(user);
  if (!foundUser) {
    const error = new Error("User not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  
  const newReview = await Review.create({
    movie,
    user,
    rating,
    reviewText,
  });

 
  const populatedReview = await Review.findById(newReview._id)
    .populate("movie", "title description director genres")  
    .populate("user", "username email");  
  
  
  foundMovie.reviews.push(newReview._id);
  await foundMovie.save();

  res.status(201).json({
    message: "Review created successfully.",
    review: populatedReview,
  });
});

export default createReview;
