import express from "express";
import updateComment from "../../controller/commentController/updateComment.js";
const updatedComment = express.Router();


updatedComment.put("/:id", updateComment);

export default updatedComment;