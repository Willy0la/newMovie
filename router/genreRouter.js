import express from "express";
import createGenre from "../controller/genre/createGenre.js";
import deleteGenre from "../controller/genre/deleteGenre.js";
import getGenres from "../controller/genre/getGenres.js";
import getSingleGenre from "../controller/genre/getSingleGenre.js";
import updateGenre from "../controller/genre/updateGenre.js";

const genreRoute = express.Router();

genreRoute.post("/create", createGenre);
genreRoute.delete("/:id", deleteGenre);
genreRoute.get("/", getGenres);
genreRoute.get("/:id", getSingleGenre);
genreRoute.put("/:id", updateGenre)

export default genreRoute;
