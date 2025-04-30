import express from "express";
import genreController from "../controller/genreController.js"

const genreRoute = express.Router();
genreRoute.post("/create",genreController.createGenre);
genreRoute.delete("/:id",genreController.deleteGenre);
genreRoute.get("/",genreController.getGenres);
genreRoute.get("/:id",genreController.getSingleGenre);
genreRoute.put("/:id",genreController.updateGenre)

export default genreRoute;
