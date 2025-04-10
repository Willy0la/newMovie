import express from "express";
import getCommentById from "../../controller/commentController/getCommentById.js";
const getSingleCommRou = express.Router();


getSingleCommRou.get("/:id", getCommentById);

export default getSingleCommRou