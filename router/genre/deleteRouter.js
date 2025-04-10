import express from "express";
import deleteGenre from "../../controller/genre/deleteGenre.js";
const deleteGenreRouter = express.Router();

deleteGenreRouter.delete("/:id", deleteGenre);

export default deleteGenreRouter;
