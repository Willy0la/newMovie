import asyncHandler from "express-async-handler";
import constant from "../../constants/constant.js";
import Comment from "../../model/comment.js";

const getAllComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find().populate("user", "username email");

  return res.status(200).json({ comments });
});

export default getAllComments;
