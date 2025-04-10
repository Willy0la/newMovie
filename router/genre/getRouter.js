import express from "express";
import getGenres from "../../controller/genre/getGenres.js";

const getGenresRouter = express.Router();

getGenresRouter.get("/", getGenres);

export default getGenresRouter;
