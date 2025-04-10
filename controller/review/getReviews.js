import asyncHandler from "express-async-handler";
import Review from "../../model/review.js";

const getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find()
    .populate("movie")
    .populate("user", "username email");

  res.json(reviews);
});

export default getReviews;
