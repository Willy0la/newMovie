import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Comment from "../../model/comment.js";

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

export default updateComment;
