const users = [
  {
    _id: "6461693bf9a77cdb3d869ca5",
    name: "Mar",
    surname: "Badia",
    email: "m.badia@gmail.com",
    password: "12345",
    phone: "6792343351",
    photo:
      "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
    birthday: "1997-01-21T00:00:00.000+00:00",
    gender: "Prefiero no decirlo",
  },
  {
    name: "Laura",
    surname: "Badia",
    email: "l.badia@gmail.com",
    password: "12345",
    phone: "6044117",
    photo:
      "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
    birthday: "1994-11-16T00:00:00.000+00:00",
    gender: "Prefiero no decirlo",
  },
  {
    name: "Leanne",
    surname: "Graham",
    email: "Sincere@gmail.com",
    password: "12345",
    phone: "67341002",
    photo:
      "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
    birthday: "1977-01-21T00:00:00.000+00:00",
    gender: "Prefiero no decirlo",
  },
  {
    _id: "647a09aec2c9e27299401deb",
    name: "Patricia",
    surname: "Karianne",
    email: "p.Karianne@gmail.com",
    password: "12345",
    phone: "679274213",
    photo:
      "http://res.cloudinary.com/dvogntdp2/image/upload/v1685034394/vnwmry1xmcbqx4ughkxl.png",
    birthday: "1987-01-21T00:00:00.000+00:00",
    gender: "Prefiero no decirlo",
  },
];

const userModel = require("../../src/mongo/models/userModel");

exports.loadUser = () => {
  const documents = users.map((user) => new userModel(user));
  return userModel.bulkSave(documents);
};
