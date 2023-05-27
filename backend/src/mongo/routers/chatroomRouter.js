const express = require("express");
const {
  getChatRoomByID,
  postChatRoom,
  deleteChatRoomById,
} = require("../controllers/chatroomController");

const chatroomRouter = express.Router();

chatroomRouter.get("/chat-room/:id", getChatRoomByID);
chatroomRouter.post("/chat-room/:user", postChatRoom);
chatroomRouter.delete("/chat-room/:id", deleteChatRoomById);

module.exports = chatroomRouter;
