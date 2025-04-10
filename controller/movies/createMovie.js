
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Movie from "../../model/movie.js";


const createMovie = asyncHandler(async (req, res, next) => {
  const { title, description, releaseDate, director, genres } = req.body;

  
  if (!title || !genres || !Array.isArray(genres) || genres.length === 0) {
    const error = new Error("Title and at least one genre are required.");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }


  const movie = await Movie.create({
    title,
    description,
    releaseDate,
    director,
    genres,
  });

  return res.status(201).json({
    message: "Movie created successfully.",
    movie,
  });
});

export default createMovie;