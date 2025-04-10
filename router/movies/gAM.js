import express from "express";
import getMovies from "../../controller/movies/getAllmov.js";

const getRouter = express.Router();

getRouter.get("/", getMovies);

export default getRouter;



