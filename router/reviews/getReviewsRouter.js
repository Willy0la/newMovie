import express from "express";
import getReviews from "../../controller/review/getReviews.js";

const getRouter = express.Router();

getRouter.get("/", getReviews);

export default getRouter;
