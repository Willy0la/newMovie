import express from "express";
import updateGenre from "../../controller/genre/updateGenre.js";
const updateGenreRouter = express.Router();

updateGenreRouter.put("/:id", updateGenre);

export default updateGenreRouter;
