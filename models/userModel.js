// User schema/model
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: [true, "This username is already taken!"],
		lowercase: true,
	},
	name: {
		type: String,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		unique: [true, "This email id is already in use. Please try to login."],
		validate: [(val) => validator.isEmail(val)],
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: true,
		minlength: 8,
		validate: {
			validator: function (val) {
				return this.password === val;
			},
			message: "Provided passwords do not match. Please try again",
		},
	},
	passwordChangedAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	passwordResetToken: {
		type: String,
		select: false,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

// 1. Document middleware to hash the password before save
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

// 2. Instance method for comparing passwords
userSchema.methods.comparePassword = async function (
	candidatePassword,
	hashedPassword
) {
	return await bcrypt.compare(candidatePassword, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
