// Handles users and authentication routes
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// *? 1. BASICS
router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

router.get(
	"/check",
	authController.protectRoute,
	authController.restrictTo("user")
);

// *? 2. FORGOT AND RESET PASSWORD
router.post("/forgotPassword", authController.generateResetToken);
router.patch("/resetPassword/:token", authController.resetPassword);

module.exports = router;
