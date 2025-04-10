import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Comment from "../../model/comment.js";

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

export default getCommentById;
