const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createPoll, getUserPolls, getPollById, voteOnPoll, deletePoll, getAllPolls } = require('../controllers/pollController');


const pollRouter = express.Router();

pollRouter.post("/create", authMiddleware, createPoll);
pollRouter.put("/vote/:pollId", authMiddleware, voteOnPoll);
pollRouter.get("/polls", authMiddleware, getAllPolls);
pollRouter.get('/user/polls', authMiddleware, getUserPolls);
pollRouter.get('/:pollId', authMiddleware, getPollById);
pollRouter.delete('/user/poll/:pollId', authMiddleware, deletePoll);


module.exports = pollRouter;
