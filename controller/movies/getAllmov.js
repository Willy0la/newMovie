import asyncHandler from "express-async-handler";
import Movie from "../../model/movie.js";


const getMovies = asyncHandler(async (req, res, next) => {

    const movies = await Movie.find().populate("reviews");
    return res.json(movies);
  });


  export default getMovies