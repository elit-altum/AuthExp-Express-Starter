// Handles user specific routes
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/sendEmails");

// ! ALL ROUTES HERE MUST BE PROTECTED BY authController.protectRoute()

// *? 0. GET SPECIFIC PROPERTIES
const getSpecifics = (req, ...props) => {
	const finalObj = {};

	const requestKeys = Object.keys(req.body);

	requestKeys.forEach((key) => {
		if (props.includes(key)) {
			finalObj[key] = req.body[key];
		}
	});

	return finalObj;
};

// *? 1. GET USER DETAILS
exports.getMe = catchAsync(async (req, res) => {
	const user = await User.findById(req.user.id).select("-__v");

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});

// *? 2. UPDATE USER DETAILS (insensitive)
exports.updateMe = catchAsync(async (req, res) => {
	if (req.body.password) {
		throw new AppError(
			"This route is not for updating passwords. Please use /updatePassword instead",
			400
		);
	}

	const santisedObject = getSpecifics(req, "email", "name", "username");

	const user = await User.findByIdAndUpdate(req.user.id, santisedObject, {
		runValidators: true,
		new: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});

// *? 3. UPDATE USER PASSWORD
exports.updatePassword = catchAsync(async (req, res) => {
	const { oldPassword, newPassword, confirmPassword } = req.body;

	if (!oldPassword || !newPassword || !confirmPassword) {
		throw new AppError(
			"Please provide the old password, new password and a password confirmation.",
			400
		);
	}

	const user = await User.findById(req.user.id).select("+password");

	const isMatch = user.comparePassword(oldPassword, user.password);

	if (!isMatch) {
		throw new AppError("The provided password is incorrect.", 403);
	}

	user.password = newPassword;
	user.passwordConfirm = confirmPassword;
	user.passwordChangedAt = Date.now();

	await user.save({
		validateBeforeSave: true,
	});

	res.status(200).json({
		status: "success",
		message: "Password changed successfully.",
	});
});

// *? 4. DELETE USER (deactivate account)
exports.deactivateUser = catchAsync(async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user.id, {
		isActive: false,
	});

	const deactivateHtml = `Sorry to see you go @${user.username}. You can reclaim access to your account by logging in again later. We hope to see you back soon.`;
	sendEmail({
		to: `${user.email}`,
		subject: "Sorry to see you go :(",
		html: deactivateHtml,
	});

	res.status(204).json({
		status: "success",
	});
});

// *? 5. DELETE USER FROM DB (admin only)
exports.deleteUser = catchAsync(async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.userId);

	if (!user) {
		throw new AppError("No user found with this id.", 404);
	}

	res.status(204).json({
		status: "success",
	});
});
