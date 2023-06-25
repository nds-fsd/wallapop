const messageModel = require("../../src/mongo/models/messageModel");

const mensajes = [
  {
    _id: "64976507ffd8789eaebbef19",
    chat_room_id: "649764fbffd8789eaebbef00",
    user_id: "6496c835a3597329ee5f7348",
    body: "Hola Mar, me interesa el altavoz",
    check: true,
    created_at: "2023-06-24T21:42:21.155+00:00",
  },
  {
    _id: "649765b4ffd8789eaebbf037",
    chat_room_id: "649764a0ffd8789eaebbee43",
    user_id: "6460c2f2980f4e977122dc3c",
    body: "Decime cuando y paso",
    check: false,
    created_at: "2023-06-24T21:42:21.155+00:00",
  },
  {
    _id: "64982ce17835e3c90d2c7bfe",
    chat_room_id: "649764a0ffd8789eaebbee43",
    user_id: "6479d339af04b142dc126e8f",
    body: "Hola",
    check: true,
    created_at: "2023-06-25T12:01:18.774+00:00",
  },
];

exports.loadMessages = () => {
  const documents = mensajes.map((mensaje) => new messageModel(mensaje));
  return messageModel.bulkSave(documents);
};
