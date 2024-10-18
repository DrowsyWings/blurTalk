const mongoose = require("mongoose");
const cuid = require("cuid");

const commentSchema = new mongoose.Schema({
  commentId: { type: String, default: cuid },
  comment: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
