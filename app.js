const express = require("express");
const app = express();
const morgan = require("morgan");
const rateLimit = require("express-rate-limit"); // security
const helmet = require("helmet"); // security
const sanitize = require("express-mongo-sanitize"); // prevent nosql injection
const xss = require("xss-clean"); // prevent any html or javscript-injection
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerJson = require("./openapi.json");

const globalErrorHandler = require("./middlewares/globalErrorHandler");

const CustomApiError = require("././utils/CustomApiError");

// mounting the routes
const productRouter = require("./routes/productRoute");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// helmet
app.use(helmet());

// rate-limit
let limit = {
  max: 1000, // max request
  windowms: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again after an hour",
};

app.use(rateLimit(limit)); // rate-limit

app.use(sanitize()); // security // prevent nosql-injection

app.use(xss()); // prevent any html or javascript-injection

// third-party middlewares
app.use(morgan("dev"));

// API-DOCUMENTATION
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

// json
app.get("/swagger-json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(swaggerJson);
});

// generate yaml file

// use the routes
app.use("/api/v1", productRouter);

// welcome page
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
    sccess: true,
  });
});

app.use("*", (req, res, next) => {
  const error = new CustomApiError(`${req.originalUrl} Route not found`, 404);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
