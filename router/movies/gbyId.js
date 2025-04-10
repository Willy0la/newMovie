import express from "express";
import getMovieById from "../../controller/movies/getMovieById.js";

const getByIdRouter = express.Router();

getByIdRouter.get("/:id", getMovieById);

export default getByIdRouter;



