const express = require("express");
const {
  postMessage,
  getMessageByChatRoom,
} = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.get("/:chat-room", getMessageByChatRoom);
messageRouter.post("/:user", postMessage);

module.exports = messageRouter;
