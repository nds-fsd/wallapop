const messageModel = require("../models/messageModel");
const chatroomModel = require("../models/chatroomModel")

const getMessageByChatRoom = async (req, res) => {
  const chatroomID = req.params["chatRoom"];
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

// const createPrivateChatMessage = async (req, res) => {

// 	try {
//         // antes de crear el mensaje, garantizamos que exista el chat que tenga el mensaje
// 		const chat = await chatroomModel.findById(req.params.chatRoom);
// 		if(chat){
// 			if(req.body.body){
// 				const message = new messageModel({user_id: req.jwtPayload.id, chat_room_id: req.params.chatRoom, body: req.body.body});
// 				message.save().then(newMessage => {
// 					messageModel.populate(newMessage, {path: 'user_id'}, (err, m) => {
						
//                         // una vez que se crea un mensaje de chat se informa al grupo que toca, con un evento
//                         // de NEW_MESSAGE
//                         // ! importante que estamos usando el socket PRIVADO
//                       socketServer.ioPrivate.to(`chat-${m.chat_room_id}`).emit("NEW_MESSAGE", m);

//                         // * Sistema de notificaciones personales
// 						// chat.users.filter(u => u !== req.jwtPayload.id).forEach(user => {
// 						// 	server.ioPrivate.to(`user-${user._id}`).emit("new-chat-message", m);
// 						// })
						
//                         res.status(201).json(m);
// 					})

// 				}).catch(e =>  {
// 					res.status(500).json({error: e.message})
// 				});
// 			}
// 		}else{
// 			res.status(500).json({error: "wrong chat ID"});
// 		}
// 	}catch (e) {
// 		res.status(500).json({error: e.message});
// 	}
// }




module.exports = {
  getMessageByChatRoom,
  postMessage,
};
