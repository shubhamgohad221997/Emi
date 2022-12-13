const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      BMI: user.BMI,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log("in auth user");
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "User Not Fouund" });
  }
  // return res.json("error occured in get user profile");
});

const calculateBMI = asyncHandler(async (req, res) => {
  const { amount, rate, month } = req.body;
  // console.log(req.body);
  let r=+(rate/12)/100
  let p=+amount;
  let n=+month;
  // let BMIValue = Math.ceil((p*r)*(1+r)*(n) /((1+r)*(n-1))) ;
  let BMIValue =  Math.ceil((+p * +r * Math.pow((1 + +r), +n) ) / (Math.pow((1 + +r),n) - 1))
  req.body.BMIValue = BMIValue;
  const { _id: userId } = req.user;
  console.log("userId", userId);
  console.log("req.body", req.body);
  let updated = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { BMI: req.body } }
  );
  res.status(200).json({ message: updated });
});

const getCalculation = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findOne({ _id: userId });
  console.log(user);
  res.status(200).json({ BMI: user.BMI });
});

module.exports = {
  registerUser,
  authUser,
  getProfile,
  calculateBMI,
  getCalculation,
};
