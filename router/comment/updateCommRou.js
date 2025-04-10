import express from "express";
import updateComment from "../../controller/commentController/updateComment.js";
const updatedComment = express.Router();


updatedComment.patch("/:id", updateComment);

export default updatedComment;