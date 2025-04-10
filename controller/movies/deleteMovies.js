import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Movie from "../../model/movie.js";


const deleteMovie = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid movie ID.");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
  
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      const error = new Error("Movie not found.");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }
  
    return res.json({
      message: "Movie deleted successfully.",
    });
  });
  export default deleteMovie