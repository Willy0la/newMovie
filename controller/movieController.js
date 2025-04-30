
import asyncHandler from "express-async-handler";
import constant from "../constants/constant.js";
import Movie from "../model/movie.js";
import mongoose from "mongoose";
import Review from "../model/review.js";

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

const getMovies = asyncHandler(async (req, res, next) => {

  const movies = await Movie.find().populate("reviews");
  return res.json(movies);
});






const getMovieById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid movie ID.");
      error.statusCode = constant.BAD_REQUEST;
      return next(error);
    }
  
    const movie = await Movie.findById(id).populate("reviews");
    if (!movie) {
      const error = new Error("Movie not found.");
      error.statusCode = constant.NOT_FOUND;
      return next(error);
    }
  
    return res.json(movie);
  });


  const updateMovie = asyncHandler(async (req, res, next) => {
      const { id } = req.params;
    
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid movie ID.");
        error.statusCode = constant.BAD_REQUEST;
        return next(error);
      }
    
      const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedMovie) {
        const error = new Error("Movie not found.");
        error.statusCode = constant.NOT_FOUND;
        return next(error);
      }
    
      return res.json({
        message: "Movie updated successfully.",
        movie: updatedMovie,
      });
    });
    

    const deleteMovie = asyncHandler(async (req, res, next) => {
      const { id } = req.params;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid movie ID.");
        error.statusCode = constant.BAD_REQUEST;
        return next(error);
      }
    
      
    
      console.log("Movie ID to delete:", id);
    
      const movieToDelete = await Movie.findById(id);
      if (!movieToDelete) {
        const error = new Error("Movie not found.");
        error.statusCode = constant.NOT_FOUND;
        return next(error);
      }
    
      await Review.deleteMany({ movie: id });
    
      await Movie.findByIdAndDelete(id);
    
      return res.json({
        message: "Movie and associated reviews deleted successfully.",
      });
    });
    
 
    


    export default {createMovie,getMovies,getMovieById,updateMovie,deleteMovie};