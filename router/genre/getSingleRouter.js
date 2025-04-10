import express from "express";
import getSingleGenre from "../../controller/genre/getSingleGenre.js";
const getGenreByIdRouter = express.Router();

getGenreByIdRouter.get("/:id", getSingleGenre);

export default getGenreByIdRouter;
