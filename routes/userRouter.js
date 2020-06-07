// Handles users and authentication routes
const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

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

// *? 3. UPDATE USER DETAILS (protected routes)
router.use(authController.protectRoute);

router.patch("/updateMe", userController.updateMe);
router.patch("/updatePassword", userController.updatePassword);

module.exports = router;
