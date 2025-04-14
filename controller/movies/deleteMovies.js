import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Movie from "../../model/movie.js";
import Review from "../../model/review.js";

const deleteMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid movie ID.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  console.log("Movie ID to delete:", id);

  const movieToDelete = await Movie.findById(id);
  if (!movieToDelete) {
    const error = new Error("Movie not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  await Review.deleteMany({ movie: id });

  await Movie.findByIdAndDelete(id);

  return res.json({
    message: "Movie and associated reviews deleted successfully.",
  });
});

export default deleteMovie;
