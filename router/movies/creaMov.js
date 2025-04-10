
import express from "express";
import createMovie from "../../controller/movies/createMovie.js";
const createRouter = express.Router();

createRouter.post("/", createMovie);

export default createRouter;


