const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String },
  status: { type: String },
  sold: { type: Boolean },
  booked: { type: Boolean },
  keywords: { type: Array },
  datePublication: { type: Date },
  // Para poder relacionar esta entidad con usuarios lo declaramos asi
  user: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      default: "Otros",
      ref: "category",
    },
  ],
  characteristics: { type: Object },

  // ESTO DE AQUI ABAJO IRA FUERA CUANDO SE TERMINE DE CAMBIAR LAS FUNCIONES
  // Y ESTEN PREPARADAS CON EL POPULATE 
  category: { type: String },
  rent: { type: String },
  space: { type: String },
  land: { type: Number },
  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  doors: { type: Number },
  seats: { type: Number },
  km: { type: Number },
  engine: { type: String },
  shift: { type: String },
});

module.exports = productSchema;
