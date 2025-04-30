import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../constants/constant.js";
import Comment from "../model/comment.js";

const createComment = asyncHandler(async (req, res, next) => {
  const { user, commentText, review } = req.body;

  if (!mongoose.Types.ObjectId.isValid(user)) {
    const error = new Error("Invalid user ID");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  if (!mongoose.Types.ObjectId.isValid(review)) {
    const error = new Error("Invalid review ID");
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
    commentText,
    review,
  });

  const populatedComment = await Comment.findById(newComment._id)
    .populate("user", "username email")
    .populate("review");

  return res.status(201).json({
    message: "New comment has been created",
    comment: populatedComment,
  });
});

const getAllComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find().populate("user", "username email");

  return res.status(200).json({ comments });
});

const getCommentById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid comment ID");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const comment = await Comment.findById(id).populate("user", "username email");

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  return res.status(200).json({ comment });
});

const updateComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { commentText } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid comment ID");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  if (!commentText || commentText.trim().length === 0) {
    const error = new Error("Comment text cannot be empty");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { commentText },
    { new: true }
  ).populate("user", "username email");

  if (!updatedComment) {
    const error = new Error("Comment not found");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  return res.status(200).json({
    message: "Comment updated successfully",
    comment: updatedComment,
  });
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid comment ID");
    error.statusCode = constant.BAD_REQUEST;
    return next(error);
  }

  const deletedComment = await Comment.findByIdAndDelete(id);

  if (!deletedComment) {
    const error = new Error("Comment not found");
    error.statusCode = constant.NOT_FOUND;
    return next(error);
  }

  return res.status(200).json({
    message: "Comment deleted successfully",
  });
});

export default {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
