const { model } = require("mongoose");
const chatroomSchema = require("../schemas/chatroomSchema");
const messageModel = require("./messageModel");

chatroomSchema.pre("remove", function (next) {
 messageModel.remove({chat_room_id: this._id})
 next();
});

const chatroomModel = model("chat-room", chatroomSchema);


module.exports = chatroomModel;
