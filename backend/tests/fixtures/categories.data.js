const categories = [
  {
    title: "Todo",
    logo: "icon-todo",
    path: "test",
  },
  {
    title: "Cartas",
    logo: "icon-todo",
    path: "test",
  },
  {
    title: "Motos",
    logo: "icon-todo",
    path: "test",
  },
  {
    title: "Coleccionismo",
    logo: "icon-todo",
    path: "test",
  },
];

const categoriesModel = require("../../src/mongo/models/categoryModel");

exports.loadCategories = () => {
  // primero hago un map del array y creo un document a partir de cada
  // objeto del array, porque es necesario que sea un document para guardarlo todo
  const documents = categories.map((category) => new categoriesModel(category));
  //  lo devuelvo todo guardado
  return categoriesModel.bulkSave(documents);
};
