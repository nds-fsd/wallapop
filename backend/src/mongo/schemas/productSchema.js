const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String },
  status: { type: String },
  sold: { type: Boolean, default: false},
  booked: { type: Boolean },
  keywords: { type: Array },
  datePublication: { type: Date },
  // Para poder relacionar producto con users
  user: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
  
  // Para poder relacionar producto con categorias
  // ponemos el valor otros por defecto porque asi si no se especifica la categoria se crea el producto en la categoria otros
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
  category: { type: String, required: true },
  rent: { type: String , required: true },
  space: { type: String, required: true },
  land: { type: Number },
  brand: { type: String },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  doors: { type: Number },
  seats: { type: Number },
  km: { type: Number, required: true },
  engine: { type: String, required: true },
  shift: { type: String, required: true},
});

module.exports = productSchema;
