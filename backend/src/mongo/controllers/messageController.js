const messageModel = require("../models/messageModel");

const getMessageByChatRoom = async (req, res) => {
  const chatroomID = req.params.chat_room_id;
  try {
    if (!chatroomID) res.status(404).json("no chatroom id provided");
    if (chatroomID) {
      const messages = await messageModel.find({ chat_room_id: chatroomID });
      res.status(200).json(messages);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

// Crear producto
const postMessage = async (req, res) => {
  const body = req;
  try {
    const newMessage = new messageModel(body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getMessageByChatRoom,
  postMessage,
};
