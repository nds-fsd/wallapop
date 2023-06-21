const { Schema } = require("mongoose");

const messageSchema = new Schema({
  chat_room_id: 
    {
      type: Schema.Types.ObjectId,
      ref: "chat-room",
    },

  user_id: 
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

  body: { type: String },
  created_at: { type: Date, default: new Date() },
});

module.exports = messageSchema;
