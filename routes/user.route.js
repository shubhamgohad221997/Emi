const express = require("express");
const {
  registerUser,
  authUser,
  getProfile,
  calculateBMI,
  getCalculation,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middlware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/getProfile").get(protect, getProfile);
router.route("/calculateBMI").post(protect, calculateBMI);
router.route("/getCalculation").get(protect, getCalculation);

module.exports = router;
