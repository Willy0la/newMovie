import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";
import constant from "../../constants/constant.js";
import mongoose from "mongoose";

const getSingleGenre = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Bad ID format.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const genre = await Genre.findById(id);

  if (!genre) {
    const error = new Error("Genre not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  res.status(200).json({
    message: "Genre fetched successfully.",
    genre,
  });
});

export default getSingleGenre;
