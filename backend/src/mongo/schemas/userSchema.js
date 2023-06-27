const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  photo: { type: String, default: "https://res.cloudinary.com/dvogntdp2/image/upload/v1687858972/Imagen_de_WhatsApp_2023-06-27_a_las_11.41.34_bwm87e.jpg" },
  adress: { type: String },
  birthday: { type: Date },
  gender: { type: String },
});

module.exports = userSchema;
