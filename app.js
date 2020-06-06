require("dotenv").config({
	path: "config.env",
});

// Middlewares, Routers and Mongo connection
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Importing routers
const userRouter = require("./routes/userRouter");
const errorHandler = require("./utils/errorHandler");

const app = express();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_SRV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connected to database!");
	})
	.catch((err) => {
		console.log("Cannot connect to database:", err);
	});

// Morgan for request logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Parse request body
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Mounting app routers
app.use("/api/v1/users", userRouter);

// Error handler
app.use(errorHandler);

module.exports = app;
