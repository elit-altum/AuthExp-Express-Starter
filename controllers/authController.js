// Handles user and authentication functions
const { promisify } = require("util");
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

	generateJWT(user, res);
});

// 2. LOGIN EXISTING USER
exports.loginUser = catchAsync(async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new AppError("Please provide username and password!", 400);
	}

	const tempUser = await User.findOne({ username }).select("+password");

	if (!tempUser) {
		throw new AppError("Invalid username or password.", 400);
	}

	const isMatch = await tempUser.comparePassword(password, tempUser.password);
	console.log(isMatch);

	if (!isMatch) {
		throw new AppError("Invalid username or password.", 400);
	}

	tempUser.password = undefined;
	generateJWT(tempUser, res);
});

// 5. LOGOUT USER
exports.logoutUser = (req, res) => {
	res.cookie("jwt", "loggedOut", {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});

	res.status(200).json({
		status: "success",
	});
};

// 4. MIDDLEWARE: PROTECT ROUTE
exports.protectRoute = catchAsync(async (req, res, next) => {
	let token = "";

	// A. Extract JWT from request
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		// For <Bearer Token> in API calls
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		// For web cookies
		token = req.cookies.jwt;
	}

	if (!token) {
		throw new AppError("Please authenticate to access.", 401);
	}

	// B. Verify JWT
	const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// C. Get user from payload user id
	const user = await User.findById(payload.id).select("+passwordChangedAt");

	if (!user || !user.isActive) {
		throw new AppError("This user no longer exists. Please login again.", 401);
	}

	// D. If user changed password after JWT issue
	const passwordChangedAt = Math.floor(
		new Date(user.passwordChangedAt).getTime() / 1000
	);

	if (passwordChangedAt > payload.iat) {
		throw new AppError(
			"Your password was changed recently. Please login again.",
			401
		);
	}

	// E. Authenticate User
	req.user = user;
	next();
});

// 5. MIDDLEWARE: RESTRICT TO ROLES ROUTE
// * Always use after protectRoute() middleware
exports.restrictTo = (...roles) => {
	return catchAsync(async (req, res, next) => {
		if (roles.includes(req.user.role)) {
			return next();
		}

		throw new AppError("You do not have permission to access this route.", 403);
	});
};
