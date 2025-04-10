import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";

const createGenre = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Genre name is required.");
  }

  const existingGenre = await Genre.findOne({ name });
  if (existingGenre) {
    res.status(400);
    throw new Error("Genre already exists.");
  }

  const genre = await Genre.create({ name, description });

  res.status(201).json({
    message: "Genre created successfully.",
    genre,
  });
});

export default createGenre;
