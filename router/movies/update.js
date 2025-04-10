
import express from "express";
import updateMovie from "../../controller/movies/updateMovie.js";
const updateRouter = express.Router();

updateRouter.put("/:id", updateMovie);

export default updateRouter;


