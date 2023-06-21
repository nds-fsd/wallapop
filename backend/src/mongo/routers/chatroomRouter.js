const express = require("express");
const { jwtMiddleware } = require("../../security/jwtMiddleware");
const {
  getChatRoomByID,
  postChatRoom,
  deleteChatRoomById,
  getAllChats,
  getProductByChatRoom,
} = require("../controllers/chatroomController");

const chatroomRouter = express.Router();

chatroomRouter.get("/", getAllChats);
chatroomRouter.get("/:id", getChatRoomByID);
chatroomRouter.get("/product/:chatroom", jwtMiddleware, getProductByChatRoom);
chatroomRouter.post("/", postChatRoom);
chatroomRouter.delete("/:id", deleteChatRoomById);

module.exports = chatroomRouter;
