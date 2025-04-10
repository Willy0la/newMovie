
import express from "express";
import deleteComment from "../../controller/commentController/createComment.js";

const delComment = express.Router();


delComment.delete("/:id", deleteComment);

export default delComment;
