import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  review:      { type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  commentText: { type: String, required: true },
  createdAt:   { type: Date, default: Date.now }
});

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
