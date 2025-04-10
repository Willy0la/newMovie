import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";

const deleteGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    res.status(404);
    throw new Error("Genre not found.");
  }

  await genre.deleteOne();

  res.status(200).json({
    message: "Genre deleted successfully.",
  });
});

export default deleteGenre;
