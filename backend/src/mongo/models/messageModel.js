const { model } = require("mongoose");
const messageSchema = require("../schemas/messageSchema");

const messageModel = model("message", messageSchema);

module.exports = messageModel;
