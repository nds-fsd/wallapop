const express = require("express");
const jwtMiddleware = require("../../security/jwtMiddleware");
const userRouter = express.Router();
const {
  userLogin,
  userRegister,
  findUserByID,
  modifyUserByID,
  deleteUserByID,
} = require("../controllers/userController");
const { getProductByUser } = require("../controllers/productController");


// userRouter.get("/user", async (req, res) => {
//   const response = await User.find();

//   res.json(response);
// });

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get("/:id", findUserByID);

userRouter.get("/products/published", getProductByUser)

userRouter.patch("/:id", jwtMiddleware, modifyUserByID);

userRouter.delete("/:id", jwtMiddleware, deleteUserByID);

module.exports = userRouter;
