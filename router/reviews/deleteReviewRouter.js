import express from "express";
import deleteReview from "../../controller/review/deleteReview.js";

const deleteRouter = express.Router();

deleteRouter.delete("/:id", deleteReview);

export default deleteRouter;
