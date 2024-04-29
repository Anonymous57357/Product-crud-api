const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})

const mongoose = require("mongoose");
// db connection
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}, console.log("database connected"));

// app
const app = require("./app")
const http = require("http");

const server = http.createServer(app);

const PORT = process.env.PORT || 3000

server.listen(3000, console.log(`server is listening on PORT ${PORT}`))

