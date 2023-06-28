const { getAll, deleteOne, getID } = require("../../services/crud-service");
const chatroomModel = require("../models/chatroomModel");

// const getChatRoomByID = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const chatroomById = await chatroomModel.findById(id).exec();
//     res.status(200).json(chatroomById);
//   } catch (error) {
//     res.status(404).json({ error: "Sorry, can't find this chat room" });
//   }
// };

const getChatRoomByID = getID({
  model: chatroomModel,
  populationFields: [],
});

// const getProductByChatRoom = async (req, res) => {
//   const { chatroom } = req.params;
//   try {
//     const chat = await chatroomModel
//       .findById(chatroom)
//       .populate("product_id")
//       .populate("buyer_id")
//       .populate("owner_id")
//       .exec();

//     res.status(200).json(chat);
//   } catch (error) {
//     return console.log(error);
//   }
// };

const getProductByChatRoom = getID({
  model: chatroomModel,
  populationFields: ["owner_id", "product_id", "buyer_id"],
});

// const getAllChats = async (req, res) => {
//   const userId = req.jwtPayload.id;
//   try {
//     const chatrooms = await chatroomModel
//       .find({
//         $or: [
//           {
//             owner_id: userId,
//           },
//           {
//             buyer_id: userId,
//           },
//         ],
//       })
//       .populate("owner_id")
//       .populate("product_id")
//       .populate("buyer_id")
//       .exec();
//     res.status(200).json(chatrooms);
//   } catch (error) {
//     res.status(404).json({ error: "Sorry, can't find this chat room" });
//   }
// };

// ME FALTA EL OR
const getAllChats = getAll({
  model: chatroomModel,
  populationFields: ["owner_id", "product_id", "buyer_id"],
  sort: "",
  entity: "chatRoom",
});

// Crear chatroom
const postChatRoom = async (req, res) => {
  const { body, jwtPayload } = req;

  try {
    const existingChat = await chatroomModel.findOne({
      buyer_id: jwtPayload.id,
      product_id: body.product_id,
    });
    if (existingChat) {
      return res.status(200).json(existingChat);
    }
    if (body.owner_id === jwtPayload.id) {
      return res
        .status(403)
        .json({ error: "You can't create a chat with yourself" });
    } else {
      const newChatRoom = new chatroomModel({
        ...body,
        buyer_id: jwtPayload.id,
      });
      await newChatRoom.save();
      res.status(201).json(newChatRoom);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const deleteChatRoomById = deleteOne({
  model: chatroomModel,
});

// const deleteChatRoomById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const delChatRoom = await chatroomModel.findByIdAndDelete(id).exec();
//     if (!delChatRoom) {
//       return res
//         .status(404)
//         .json({ error: "Sorry, can't find this chat room" });
//     }
//     res.status(204).json({
//       delChatRoom,
//       message: "Your chat room has been successfully deleted",
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the chat room" });
//   }
// };

module.exports = {
  getAllChats,
  deleteChatRoomById,
  postChatRoom,
  getChatRoomByID,
  getProductByChatRoom,
};
