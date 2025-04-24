import express from "express";

import createMovie from "../controller/movies/createMovie.js";
import deleteMovie from "../controller/movies/deleteMovies.js";
import getMovieById from "../controller/movies/getMovieById.js";
import getMovies from "../controller/movies/getAllmov.js";
import updateMovie from "../controller/movies/updateMovie.js";

const movieRouter = express.Router();

movieRouter.post("/create", createMovie);
movieRouter.delete("/:id", deleteMovie);
movieRouter.get("/:id", getMovieById);
movieRouter.get("/", getMovies);
movieRouter.put("/:id", updateMovie);

export default movieRouter;
