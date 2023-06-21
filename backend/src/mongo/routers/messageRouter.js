const express = require("express");
const {
  postMessage,
  getMessageByChatRoom,
} = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.get("/:chatRoom", getMessageByChatRoom);
messageRouter.post("/", postMessage);

module.exports = messageRouter;
