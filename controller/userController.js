const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);

  if (!name || !email || !password) {
    res.status(400).json("please add a value");
  }

  const existingUser = await userModel.findOne({ where: { email } });

  if (existingUser) {
    res.status(409).json("user exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ user: { name, email }, message: "new user added" });
};

const login = async (req, res) => {
  res.status(200).json("great success");
};

module.exports = { registerUser, login }
