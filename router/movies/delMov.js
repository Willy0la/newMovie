import express from "express";
import deleteMovie from "../../controller/movie/deleteMovie.js";

const deleteRouter = express.Router();

deleteRouter.delete("/:id", deleteMovie);

export default deleteRouter;



