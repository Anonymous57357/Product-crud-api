const express = require("express");
const app = express();
const morgan = require("morgan");

const productRouter = require("./routes/productRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use("/api/v1", productRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
    sccess: true,
  });
});

module.exports = app;
