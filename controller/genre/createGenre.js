import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";

const createGenre = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    const error = new Error("Genre name is required.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const existingGenre = await Genre.findOne({ name });
  if (existingGenre) {
    const error = new Error("Genre exists.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }
  

  const genre = await Genre.create({ name, description });

  res.status(201).json({
    message: "Genre created successfully.",
    genre,
  });
});

export default createGenre;
