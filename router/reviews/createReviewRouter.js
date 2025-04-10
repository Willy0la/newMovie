import express from "express";
import createReview from "../../controller/review/createReview.js";

const createRouter = express.Router();

createRouter.post("/", createReview);

export default createRouter;
