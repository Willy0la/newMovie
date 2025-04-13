import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";
import constant from "../../constants/constant.js";

const updateGenre = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    const error = new Error("Genre not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  genre.name = name || genre.name;
  genre.description = description || genre.description;

  await genre.save();

  res.status(200).json({
    message: "Genre updated successfully.",
    genre,
  });
});

export default updateGenre;
