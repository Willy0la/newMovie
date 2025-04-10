import express from "express";
import createGenre from "../../controller/genre/createGenre.js";

const createGenreRouter = express.Router();

createGenreRouter.post("/", createGenre);

export default createGenreRouter;
