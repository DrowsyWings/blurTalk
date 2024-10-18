const Poll = require('../db/pollModel');
const User = require('../db/userModel');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const z = require('zod');

// Zod schema for poll creation
const pollSchema = z.object({
  question: z.string().min(1, 'Poll question is required'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).min(2, 'At least two options are required'),
});

// Create a poll
const createPoll = asyncHandler(async (req, res) => {
  const { question, options } = req.body;
  const validatedPoll = pollSchema.parse({ question, options });
  const authorId = req.user.id;  // Getting the user ID from the authenticated request

  const poll = await Poll.create({
    author: authorId,
    question: validatedPoll.question,
    options: validatedPoll.options.map(option => ({
      option,
      votes: 0,
    })),
  });
  

  const user = await User.findById(authorId);
  user.polls.push(poll._id);
  await user.save();

  res.status(201).json({
    success: true,
    pollId: poll.pollId,
    message: "Poll created successfully",
  });
});

// // Get all polls
const getAllPolls = asyncHandler(async (req, res, next) => {
  const polls = await Poll.find().populate('author',['username', '_id']);
  res.status(200).json({
    success: true,
    polls,
  });
});

const getUserPolls = asyncHandler(async (req, res, next) => {
    const userId = req.user.id; 
  
    const user = await User.findById(userId).populate("polls"); 
  
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  
    res.status(200).json({
      success: true,
      polls: user.polls, 
    });
  });
  

// Get a specific poll by ID
const getPollById = asyncHandler(async (req, res, next) => {
  const { pollId } = req.params;
  const poll = await Poll.findById(pollId).populate('author', ['username', '_id']);

  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  res.status(200).json({
    success: true,
    poll,
  });
});

// Vote on a poll
const voteOnPoll = asyncHandler(async (req, res, next) => {
  const { pollId } = req.params;
  const { answer } = req.body;
  const userId = req.user.id;

  if (!answer) {
    throw new ApiError(400, 'No answer provided');
  }

  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new ApiError(404, 'Poll not found');
  }

  // Check if the user has already voted
  if (poll.voted.includes(userId)) {
    throw new ApiError(400, 'User has already voted');
  }

  const updatedOptions = poll.options.map(option => {
    if (option.option === answer) {
      return { ...option, votes: option.votes + 1 };
    }
    return option;
  });

  poll.options = updatedOptions;
  poll.voted.push(userId);
  await poll.save();

  res.status(200).json({
    success: true,
    poll,
    message: 'Vote registered successfully',
  });
});

// Delete a poll
const deletePoll = asyncHandler(async (req, res, next) => {
  const { pollId } = req.params;
  const userId = req.user.id;

  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  // Ensure the poll belongs to the user
  if (poll.author.toString() !== userId) {
    throw new ApiError(403, 'Unauthorized action');
  }

  await poll.remove();
  res.status(200).json({
    success: true,
    message: 'Poll deleted successfully',
  });
});

module.exports = {
  getAllPolls,
  createPoll,
  getUserPolls,
  getPollById,
  voteOnPoll,
  deletePoll,
};