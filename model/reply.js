import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  comment:   { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  replyText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Reply = mongoose.model("Reply", replySchema);

export default Reply 