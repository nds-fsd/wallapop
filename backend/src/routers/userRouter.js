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

userRouter.post("/user/register", userRegister);

userRouter.post("/user/login", userLogin);

userRouter.get("/user/:id", findUserByID);

userRouter.patch("/user/:id", jwtMiddleware, modifyUserByID);

userRouter.delete("/user/:id", jwtMiddleware, deleteUserByID);

module.exports = userRouter;
