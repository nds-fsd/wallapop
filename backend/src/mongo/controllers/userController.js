const express = require("express");
const userModel = require("../models/userModel");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // * Validate, email and password were provided in the request
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: { login: "Missing email or password" } });
  }
  try {
    const foundUser = await userModel.findOne({ email });
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
        photo: foundUser.photo
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { register: "Error Login in :(", error: err.message } });
  }
};

const userRegister = async (req, res) => {
  const email = req.body.email;
  const { body } = req;
  console.log("este es el body que nos llega", body);
  try {
    if (!email) {
      return res
        .status(400)
        .json({ error: { register: "Email not recieved" } });
    }
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: { email: "Email already registered" } });
    } else {
      const newUser = new userModel(body);
      console.log("este es el nuevo usuario", newUser);
      const savedUser = await newUser.save();
      if (savedUser) {
        const token = savedUser.generateJWT();
        console.log(token);
        return res.status(201).json({
          token: token,
          user: {
            email: savedUser.email,
            name: savedUser.name,
            id: savedUser._id,
            photo: savedUser.photo
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const findUserByID = async (req, res) => {
  const newFind = await userModel.findById(req.params.id);
  if (!newFind) {
    res.status(404).json("Sorry cant find that!");
  } else {
    res.status(200).json(newFind);
  }
};

const modifyUserByID = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
  console.log("user", user);
  if (!user) {
    res.status(404).json({ error: { id: "Sorry cant find that!" } });
  } else {
    res.status(200).json(user);
  }
};

const deleteUserByID = async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id, req.body);
  if (!user) {
    res.status(404).json({ error: { id: "Sorry cant find that!" } });
  } else {
    res.status(200).json(user);
  }
};

module.exports = {
  userLogin,
  userRegister,
  modifyUserByID,
  deleteUserByID,
  findUserByID,
};
