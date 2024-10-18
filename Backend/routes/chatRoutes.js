const express = require("express");
// const { saveMessage, getMessages } = require('../controllers/chatController');
const chatRouter = express.Router();

chatRouter.post("/message", saveMessage);
chatRouter.get("/messages/:roomId", getMessages);

module.exports = chatRouter;
