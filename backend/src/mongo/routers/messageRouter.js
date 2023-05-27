const express = require("express");
const {
  postMessage,
  getMessageByChatRoom,
} = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.get("/message/:chat-room", getMessageByChatRoom);
messageRouter.post("/message/:user", postMessage);

module.exports = messageRouter;
