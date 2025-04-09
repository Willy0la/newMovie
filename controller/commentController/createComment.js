import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Comment from "../../model/comment.js";

const createComment = asyncHandler(async (req, res, next) => {
  const { user, review, commentText } = req.body;
  const { id } = req.params; 

 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid review ID in params");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  
  if (!mongoose.Types.ObjectId.isValid(user)) {
    const error = new Error("Invalid user ID");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  
  if (!mongoose.Types.ObjectId.isValid(review)) {
    const error = new Error("Invalid review ID in body");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  if (!commentText || commentText.trim().length === 0) {
    const error = new Error("Comment text cannot be empty");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const newComment = await Comment.create({
    user,
    review,
    commentText,
  });

  
  const populatedComment = await Comment.findById(newComment._id)
    .populate("user", "username email") 
    .populate("review"); 

  return res.status(201).json({
    message: "New comment has been created",
    comment: populatedComment,
  });
});

export default createComment;
