const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

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

  await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ user: { name, email }, message: "new user added" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);

  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.match(emailFormat)) {
    res.status(400).json("Invalid email format.");
    return;
  }

  const foundUser = await userModel.findOne({ where: { email } });

  if (!foundUser) {
    return res.status(401).json("username or password not found");
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchedPassword) {
    return res.status(401).json("username or password not found");
  }

  res.status(200).json({
    token: genToken(foundUser.id),
  });
};

const getMyInfo = () => {
  
}

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};



module.exports = { registerUser, login };
