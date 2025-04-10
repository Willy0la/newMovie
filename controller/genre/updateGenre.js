import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";

const updateGenre = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    res.status(404);
    throw new Error("Genre not found.");
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
