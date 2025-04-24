
import express from "express";
import createComment from "../controller/commentController/createComment.js";
import deleteComment from "../controller/commentController/deleteComment.js";
import getAllComments from "../controller/commentController/getAllComment.js";
import getCommentById from "../controller/commentController/getCommentById.js";
import updateComment from "../controller/commentController/updateComment.js";
const commentRoute = express.Router();


commentRoute.post("/create", createComment);
commentRoute.delete("/:id", deleteComment)
commentRoute.get("/", getAllComments);
commentRoute.get("/:id", getCommentById);
commentRoute.put("/:id", updateComment);


export default commentRoute



