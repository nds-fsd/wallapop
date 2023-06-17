const express = require("express");
const {
  postMessage,
  getMessageByChatRoom,
  createPrivateChatMessage,
} = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.get("/:chatRoom", getMessageByChatRoom);
messageRouter.post("/", createPrivateChatMessage);

module.exports = messageRouter;
