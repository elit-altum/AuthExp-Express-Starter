// Handles user and authentication functions
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// 0. GENERATE JWT
const generateJWT = (user, res) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});

	// Send cookie
	res.cookie("jwt", token, {
		httpOnly: true,
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
	});

	// Send response
	res.status(200).json({
		status: "success",
		data: {
			token,
			user,
		},
	});
};

// 1. SIGNUP NEW USER
exports.signupUser = catchAsync(async (req, res) => {
	const { username, password, name, passwordConfirm } = req.body;

	const user = await User.create({
		username,
		name,
		password,
		passwordConfirm,
	});

	user.password = undefined;

	generateJWT(user, res);
});

// 2. LOGIN EXISTING USER
