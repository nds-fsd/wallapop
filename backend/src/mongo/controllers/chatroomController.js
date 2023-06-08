const chatroomModel = require("../models/chatroomModel");

const getChatRoomByID = async (req, res) => {
  const { id } = req.params;
  try {
    const chatroomById = await chatroomModel.findById(id).exec();
    res.status(200).json(chatroomById);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this chat room" });
  }
};
const getAllChats = async (req, res) => {
  const userId = req.jwtPayload.id;
  try {
    const chatrooms = await chatroomModel.find({
      $or: [{
        owner_id: userId
      }, 
    {
      buyer_id: userId
    }]
    }).exec();
    res.status(200).json(chatroomById);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this chat room" });
  }
};

// Crear chatroom
const postChatRoom = async (req, res) => {
  const { body, jwtPayload } = req;
  try {

    const newChatRoom = new chatroomModel({...body, buyer_id: jwtPayload.id});
    await newChatRoom.save();
    res.status(201).json(newChatRoom);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const deleteChatRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const delChatRoom = await chatroomModel.findByIdAndDelete(id).exec();
    if (!delChatRoom) {
      return res
        .status(404)
        .json({ error: "Sorry, can't find this chat room" });
    }
    res.status(204).json({
      delChatRoom,
      message: "Your chat room has been successfully deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the chat room" });
  }
};

module.exports = {
  getAllChats,
  deleteChatRoomById,
  postChatRoom,
  getChatRoomByID,
};
