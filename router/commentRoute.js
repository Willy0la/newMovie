
import express from "express";
import commentController from "../controller/commentController.js";


const commentRoute = express.Router();
commentRoute.post("/create", commentController.createComment);
commentRoute.delete("/:id", commentController.deleteComment)
commentRoute.get("/", commentController.getAllComments);
commentRoute.get("/:id", commentController.getCommentById);
commentRoute.put("/:id", commentController.updateComment);


export default commentRoute



