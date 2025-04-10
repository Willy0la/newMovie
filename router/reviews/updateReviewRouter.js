import express from "express";
import updateReview from "../../controller/review/updateReview.js";

const updateRouter = express.Router();

updateRouter.put("/:id", updateReview);

export default updateRouter;
