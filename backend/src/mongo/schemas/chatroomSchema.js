const { Schema, SchemaType } = require("mongoose");

// creamos el esquema de la entidad
const chatroomSchema = new Schema({
  product_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  owner_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  buyer_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = chatroomSchema;
