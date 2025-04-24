import express from "express";
import createReview from "../controller/review/createReview.js";
import getReviews from "../controller/review/getReviews.js";
import getReviewById from "../controller/review/getReviewById.js";
import deleteReview from "../controller/review/deleteReview.js";
import updateReview from "../controller/review/updateReview.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", createReview);
reviewRouter.get("/", getReviews)
reviewRouter.get("/:id", getReviewById)
reviewRouter.delete("/:id", deleteReview)
reviewRouter.put("/:id", updateReview)

export default reviewRouter;
