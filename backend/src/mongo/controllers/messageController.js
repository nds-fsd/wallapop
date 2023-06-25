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
    const chat = await chatroomModel.findById(body.chat_room_id);
    if (!chat) {
      return res.status(500).json({ error: "wrong chat ID" });
    }

    if (!body.body) {
      return res.status(400).json({ error: "empty message body" });
    }

    const newMessage = new messageModel({
      ...body,
      user_id: jwtPayload.id,
    });

    await newMessage.save();

    m.ioPrivate
      .to(`chat-${newMessage.chat_room_id}`)
      .emit("NEW_MESSAGE", newMessage);
    res.status(200).json(newMessage);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const patchMessage = async (req, res) => {
  const { body, jwtPayload } = req;
  if (!req.params.chatId) {
    return res.status(404).json({ error: "Sorry, not chatId found" });
  }
  try {
    const messages = await messageModel
      .updateMany(
        {
          chat_room_id: req.params.chatId,
          user_id: { $ne: jwtPayload.id },
          check: false,
        },
        body
      )
      .exec();

    m.ioPrivate.to(`chat-${req.params.chatId}`).emit("READ_MESSAGES");

    res.status(201).json(messages);
  } catch (e) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the messages" });
  }
};

// const patchMessage = async (req, res) => {
//   const { body, jwtPayload } = req;
//   try {
//     const message = await messageModel
//       .updateMany(
//         { chat_room_id: body.chat_room_id, user_id: { $ne: jwtPayload.id } },
//         { $set: { check: true } }
//       )
//       .exec();
//     if (!message) {
//       return res.status(404).json({ error: "Sorry, can't find this message" });
//     }
//     res.status(201).json(message);
//   } catch (e) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the message" });
//   }
// };

const getCheckMessages = async (req, res) => {
  const chatroom = req.params.chatroom;
  try {
    if (!chatroom) {
      res.status(404).json("no chatroom id provided");
    } else {
      const messages = await messageModel
        .find({
          chat_room_id: chatroom,
          check: false,
          user_id: { $ne: req.jwtPayload.id },
        })
        .exec();

      res.status(200).json(messages);
    }
  } catch (e) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getMessageByChatRoom,
  postMessage,
  patchMessage,
  getCheckMessages,
};
