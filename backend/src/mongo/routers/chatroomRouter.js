const express = require("express");
const {
  getChatRoomByID,
  postChatRoom,
  deleteChatRoomById,
  getAllChats,
  getChatRoomID,
} = require("../controllers/chatroomController");

const chatroomRouter = express.Router();

chatroomRouter.get("/", getAllChats);
chatroomRouter.get("/:id", getChatRoomByID);
chatroomRouter.get("/:buyerid/:productid", getChatRoomID)
chatroomRouter.post("/", postChatRoom);
chatroomRouter.delete("/:id", deleteChatRoomById);

module.exports = chatroomRouter;
