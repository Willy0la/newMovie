import express from "express";
import deleteMovie from "../../controller/movies/deleteMovies.js";

const deleteRouter = express.Router();

deleteRouter.delete("/:id", deleteMovie);

export default deleteRouter;
