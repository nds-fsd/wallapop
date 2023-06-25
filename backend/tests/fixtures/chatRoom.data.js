const chatroomModel = require("../../src/mongo/models/chatroomModel");

const chatRooms = [
  {
    _id: "649764a0ffd8789eaebbee43",
    product_id: "648203b0821fd45051675928",
    owner_id: "6488844a85809e9a41b9d192",
    buyer_id: "6488844a85809e9a41b9d192",
  },
  {
    _id: "6497707b6bf946d3bae4666c",
    product_id: "64973c6ad76a2e666af72f25",
    owner_id: "6479d339af04b142dc126e8f",
    buyer_id: "6460c2f2980f4e977122dc3c",
  },
];

exports.loadChatRoom = () => {
  const documents = chatRooms.map((chatRoom) => new chatroomModel(chatRoom));
  return chatroomModel.bulkSave(documents);
};
