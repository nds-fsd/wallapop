const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  adress: { type: String },
  birthday: { type: Date },
  gender: { type: String },
});

const User = model("user", userSchema);

module.exports = User;
