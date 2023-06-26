const favorites = [
  {
    _id: "648b423a6d0450e3363bf0bf",
    user: "648203b0821fd45051675928",
    products: "6488844a85809e9a41b9d192",
  },
  {
    _id: "649603c2f429de3b240b3b77",
    user: "647a09aec2c9e27299401deb",
    products: "646b50906a04146e100478c3",
  },
];

const favoriteModel = require("../../src/mongo/models/favoriteModel");

exports.loadFav = () => {
  const documents = favorites.map((favorit) => new favoriteModel(favorit));
  return favoriteModel.bulkSave(documents);
};
