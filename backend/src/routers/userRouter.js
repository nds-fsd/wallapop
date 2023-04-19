const express = require("express");
const User = require("../mongo/schemas/user");
const jwtMiddleware = require("../security/jwtMiddleware");
const userRouter = express.Router();

// userRouter.get("/user", async (req, res) => {
//   const response = await User.find();

//   res.json(response);
// });

// ! ------------------ REGISTER ------------------

userRouter.post("/user/register", async (req, res) => {
  const email = req.body.email;
  const body = req.body;

  if (!email) {
    return res.status(400).json({ error: { register: "Email not recieved" } });
  }
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .json({ error: { email: "Email already registered" } });
  } else {
    const newUser = new User({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: body.password,
      phone: body.phone,
      photo: body.photo,
      adress: body.adress,
      birthday: body.birthday,
      gender: body.gender,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({
        token: savedUser.generateJWT(),
        user: {
          email: savedUser.email,
          name: savedUser.name,
          id: savedUser._id,
        },
      });
    } else {
      return res
        .status(500)
        .json({ error: { firstName: "Error creating new User :(", err } });
    }
  }
});

// ! ------------------ LOGIN ------------------

userRouter.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  // * Validate, email and password were provided in the request
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: { login: "Missing email or password" } });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ error: { email: "User not found, please Register" } });
    }
    // * Validate password with bcrypt library
    if (!foundUser.comparePassword(password)) {
      return res.status(400).json({ error: { password: "Invalid Password" } });
    }
    // * if everything is ok, return the new token and user data
    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        email: foundUser.email,
        name: foundUser.name,
        id: foundUser._id,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { register: "Error Login in :(", error: err.message } });
  }
});

// ! ------------------ FIND BY ID ------------------

userRouter.get("/user/:id", async (req, res) => {
  const newFind = await User.findById(req.params.id);

  if (!newFind) {
    res.status(404).json("Sorry cant find that!");
  } else {
    res.status(200).json(newFind);
  }
});

// ! ------------------ MODIFY AN USER BY ID ------------------

userRouter.patch("/user/:id", jwtMiddleware, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  if (!user) {
    res.status(404).json({ error: { id: "Sorry cant find that!" } });
  } else {
    res.status(200).json(user);
  }
});

// ! ------------------ DELETE AN USER BY ID ------------------

userRouter.delete("/user/:id", jwtMiddleware, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id, req.body);
  if (!user) {
    res.status(404).json({ error: { id: "Sorry cant find that!" } });
  } else {
    res.status(200).json(user);
  }
});

module.exports = userRouter;
