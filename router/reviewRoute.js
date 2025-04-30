import express from "express";
import reviewController from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", reviewController.createReview);
reviewRouter.get("/", reviewController.getReviews)
reviewRouter.get("/:id", reviewController.getReviewById)
reviewRouter.delete("/:id", reviewController.deleteReview)
reviewRouter.put("/:id", reviewController.updateReview)

export default reviewRouter;
