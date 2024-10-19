const Post = require("../db/postModel");
const Comment = require('../db/commentModel')
const z = require("zod");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const getPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const lastPostDate = req.query.lastPostDate;

    // If lastPostDate exists, fetch posts before that date
    const query = lastPostDate
      ? { createdAt: { $lt: new Date(lastPostDate) } }
      : {};

    const posts = await Post.find(query)
          .sort({ createdAt: -1 })
          .limit(limit)
          .populate("author", ["username", "_id"]);

    res.status(200).json({
      success: true,
      posts,
      hasMore: posts.length === limit,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};

// Zod validation
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const createPost = async (req, res) => {
  console.log(req.body);
  try {
    const validatedData = postSchema.parse(req.body);
    const authorId = req.user._id; //  user ID

    const newPost = new Post({
      title: validatedData.title,
      content: validatedData.content,
      author: authorId, // Author is a MongoDB ObjectId
    });

    const savedPost = await newPost.save();

    res.status(200).json({
      success: true,
      post: savedPost,
      postId: savedPost.postId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(411).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create post",
        error: error.message,
      });
    }
  }
};

//Zod validation
const voteValidation = z.object({
  voteType: z.enum(["upvote", "downvote"]),
  postId: z.string()
});

const votePost = asyncHandler(async (req, res, next) => {
  const validationResult = voteValidation.safeParse(req.body);
  if (!validationResult.success) {
    return next(new ApiError("Invalid vote type", 400));
  }
  const { voteType } = validationResult.data.voteType;
  const postId = validationResult.data.postId;

  const post = await Post.findOne({ postId });
  if (!post) {
    return next(new ApiError("Post not found", 404));
  }
  // Increment the vote counter
  if (voteType === "upvote") {
    post.upvotes += 1;
  } else if (voteType === "downvote") {
    post.downvotes += 1;
  }

  await post.save();
  res.status(200).json({ message: "Vote registered", post });
});

const commentValidation = z.object({
  comment: z.string().min(1),
  postId: z.string(),
});
const addComment = async (req, res) => {
  try {
    const validatedComment = commentValidation.parse(req.body);
    const authorId = req.user.id; 
    const postId = validatedComment.postId;
    
    const comment = new Comment({
      comment: validatedComment.comment,
      post: postId,
      author: authorId,
    });

    const savedComment = await comment.save();

    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: savedComment._id } }, 
      { new: true }
    );

    
    res.status(201).json({
      success: true,
      comment: savedComment,
      message: "Comment added successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(411).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to add comment",
        error: error.message,
      });
    }
  }
};
;

module.exports = { createPost, getPosts, votePost, addComment };
