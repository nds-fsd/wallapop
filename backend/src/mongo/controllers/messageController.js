const messageModel = require("../models/messageModel");

const getMessageByChatRoom = async (req, res) => {
  const chatroomID = req.params.chat_room_id;
  try {
    if (!chatroomID) {res.status(404).json("no chatroom id provided");
  } else {
      const messages = await messageModel.find({ chat_room_id: chatroomID }).sort({created_at: -1}).exec();

      res.status(200).json(messages);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

// Crear mensaje
const postMessage = async (req, res) => {
  const {body, jwtPayload} = req;
  try {
    const newMessage = new messageModel({...body, user_id: jwtPayload.id});
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
