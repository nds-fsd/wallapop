const messageModel = require("../models/messageModel");
const chatroomModel = require("../models/chatroomModel");
const m = require("../../index");

const getMessageByChatRoom = async (req, res) => {
  const chatroomID = req.params["chatRoom"];
  try {
    if (!chatroomID) {
      res.status(404).json("no chatroom id provided");
    } else {
      const messages = await messageModel
        .find({ chat_room_id: chatroomID })
        .sort({ created_at: 1 })
        .exec();

      res.status(200).json(messages);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

// Crear mensaje
const postMessage = async (req, res) => {
  const { body, jwtPayload } = req;
  try {
    const chat = await chatroomModel.findById(req.params.chatRoom);

    const newMessage = new messageModel({ ...body, user_id: jwtPayload.id });
    await newMessage.save();
    m.ioPrivate.emit("NEW_MESSAGE", newMessage);

    res.status(201).json(newMessage);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getMessageByChatRoom,
  postMessage,
};
