import express from "express";
import getReviewById from "../../controller/review/getReviewById.js";

const getByIdRouter = express.Router();

getByIdRouter.get("/:id", getReviewById);

export default getByIdRouter;
