import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";

const getSingleGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    res.status(404);
    throw new Error("Genre not found.");
  }

  res.status(200).json({
    message: "Genre fetched successfully.",
    genre,
  });
});

export default getSingleGenre;

