const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const colors = require("colors");

const mongoose = require("mongoose");
// db connection
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(
  DB,
  console.log(`database connected successfully`.cyan.underline.bold)
);

// app
const app = require("./app");
const http = require("http");

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(
  PORT,
  console.log(`server is listening on PORT ${PORT}`.yellow.underline.bold)
);
