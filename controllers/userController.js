// Handles user specific routes
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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

// *? 1. UPDATE USER DETAILS (insensitive)
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

// *? 2. UPDATE USER PASSWORD
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
