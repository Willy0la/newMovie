import asyncHandler from "express-async-handler";
import Genre from "../../model/genre.js";

const deleteGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    const error = new Error("Genre not found.");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  await genre.deleteOne();

  res.status(200).json({
    message: "Genre deleted successfully.",
  });
});

export default deleteGenre;
