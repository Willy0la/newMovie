import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";

const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find();

  res.status(200).json({
    message: "Genres fetched successfully.",
    genres,
  });
});

export default getGenres;
