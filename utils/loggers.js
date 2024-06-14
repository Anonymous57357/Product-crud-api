const winston = require("winston");
const { combine, timestamp, prettyPrint, errors, json } = winston.format;

const loggers = winston.createLogger({
  level: "debug",
  format: combine(errors({ stack: true }), timestamp(), prettyPrint(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/product.log",
      format: json(),
    }),
  ],
  defaultMeta: { service: "product-mangement-service" },
});

module.exports = loggers;
