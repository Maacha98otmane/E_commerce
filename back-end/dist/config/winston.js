"use strict";

var winston = require('winston'); // require('winston-mongodb')


var levels = {
  error: 0,
  info: 1
};
var colors = {
  error: 'red',
  info: 'green'
};
winston.addColors(colors);
var format = winston.format.combine(winston.format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss:ms'
}), winston.format.printf(function (info) {
  return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
}));
var transports = [new winston.transports.Console({
  format: winston.format.combine(winston.format.colorize(), format)
}) // new winston.transports.MongoDB({
//   db: process.env.mongoURL,
//   options: {
//     useUnifiedTopology: true
//   },
//   collection: 'loggers_info',
//   level: 'info'
// }),
// new winston.transports.MongoDB({
//   db: process.env.mongoURL,
//   options: {
//     useUnifiedTopology: true
//   },
//   collection: 'loggers_error',
//   level: 'error'
// }),
// new winston.transports.File({
//   filename: 'logs/error.log',
//   level: 'error',
// }),
// new winston.transports.File({
//   filename: 'logs/info.log',
//   level: 'info',
// }),
];
var logger = winston.createLogger({
  levels: levels,
  format: format,
  transports: transports
});
module.exports = logger;