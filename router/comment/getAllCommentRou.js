import express from "express";
import getAllComments from "../../controller/commentController/getAllComment.js";

const getAllCommRou = express.Router();


getAllCommRou.get("/", getAllComments);

export default getAllCommRou