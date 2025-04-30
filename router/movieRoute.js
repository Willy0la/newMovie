import express from "express";

import movieController from "../controller/movieController.js";

const movieRouter = express.Router();

movieRouter.post("/create", movieController.createMovie);
movieRouter.delete("/:id", movieController.deleteMovie);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.get("/", movieController.getMovies);
movieRouter.put("/:id", movieController.updateMovie);

export default movieRouter;
