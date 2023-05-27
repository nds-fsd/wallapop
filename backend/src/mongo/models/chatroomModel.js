const { model } = require("mongoose");
const chatroomSchema = require("../schemas/chatroomSchema");

const chatroomModel = model("chat-room", chatroomSchema);

module.exports = chatroomModel;
