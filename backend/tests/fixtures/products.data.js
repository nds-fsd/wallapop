const products = [
  {
    booked: false,
    categories: ["644fe58f93ff3b3b028e576b"],
    category: "Coleccionismo",
    datePublication: "2023-04-02T15:25:30.771Z",
    description: "Pack cartas Pokemón incluye todo lo que se ve en las fotos",
    keywords: ["cartas", "pokemon"],
    price: 4564,
    sold: false,
    status: "Como nuevo",
    title: "Cartas Pokemón TCG",
    user: "647a09aec2c9e27299401deb",
  },
  {
    booked: false,
    categories: ["644fe58f93ff3b3b028e576b"],
    category: "Coleccionismo",
    datePublication: "2023-05-02T15:25:30.771Z",
    description:
      "Moneda del 2014 España, con error de acuñación. 2 cabezas en vez de una, lo cual lo convierte en una moneda muy valiosa y buscada.(BAJO PRECIO) si estás interesad@ en otra moneda dímelo que veo si la tengo y hablamos.",
    keywords: ["monedas"],
    price: 999.99,
    sold: false,
    status: "Como nuevo",
    title: "Moneda con error de acuñación muy rara.",
    user: "647a09aec2c9e27299401deb",
  },
  {
    booked: false,
    categories: ["644fe58f93ff3b3b028e576b"],
    category: "Coleccionismo",
    datePublication: "2023-01-09T15:25:30.771Z",
    description:
      "Años 70 cuando aún se llamaba athletico de bilbao debido al régimen franquista unidad 10 euros lote de todas 100 euros",
    keywords: ["cromos"],
    price: 10,
    sold: false,
    status: "Como nuevo",
    title: "Fotopostales athletico Bilbao originales de epoca",
    user: "647a09aec2c9e27299401deb",
  },
  {
    booked: false,
    datePublication: "2023-06-05T15:22:24.504Z",
    title: "Ducati Monster",
    description:
      "Fantástica moto Ducati. La vendo porque he sido padre hace poco y necesito comprar un coche para llevar la sillita del bebé. Te sentirás como H en A3MSEC ",
    price: 6800,
    status: "Poco uso",
    sold: false,
    keywords: ["Moto", "Ducati"],
    categories: ["644fe58f93ff3b3b028e575d"],
    category: "Motos",
    brand: "Ducati",
    model: "Monster",
    year: 2018,
    doors: null,
    seats: null,
    km: 8500,
    engine: "gasolina",
    shift: "Manual",
    user: "6460c2f2980f4e977122dc3c",
    location: "",
  },
];

const productModel = require("../../src/mongo/models/productModel");

exports.loadProducts = () => {
  const documents = products.map((product) => new productModel(product));
  return productModel.bulkSave(documents);
};
