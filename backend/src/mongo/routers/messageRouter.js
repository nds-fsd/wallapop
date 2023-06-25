const express = require("express");
const {
  postMessage,
  getMessageByChatRoom,
  getCheckMessages,
  patchMessage,
} = require("../controllers/messageController");
const { jwtMiddleware } = require("../../security/jwtMiddleware");

const messageRouter = express.Router();

messageRouter.get("/:chatRoom", jwtMiddleware, getMessageByChatRoom);
messageRouter.get("/nocheck/:chatroom", jwtMiddleware, getCheckMessages);
messageRouter.post("/", jwtMiddleware, postMessage);
messageRouter.patch("/:chatId", jwtMiddleware, patchMessage);

module.exports = messageRouter;
