const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getPosts,
  votePost,
  addComment,
} = require("../controllers/postController");


const authMiddleware = require("../middlewares/authMiddleware");
postRouter.post("/create", authMiddleware, createPost);
postRouter.get("/", getPosts);
postRouter.put("/vote/:id", votePost);
postRouter.post("/comment/:id", addComment);

module.exports = postRouter;
