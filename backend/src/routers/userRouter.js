const express = require("express");
const User = require("../mongo/schemas/user");
const jwtMiddleware = require("../security/jwtMiddleware");
const userRouter = express.Router();
const {
  userLogin,
  userRegister,
  findUserByID,
  modifyUserByID,
  deleteUserByID,
} = require("../controllers/userController");

// userRouter.get("/user", async (req, res) => {
//   const response = await User.find();

//   res.json(response);
// });

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get("/:id", findUserByID);

userRouter.patch("/:id", jwtMiddleware, modifyUserByID);

userRouter.delete("/:id", jwtMiddleware, deleteUserByID);

module.exports = userRouter;
