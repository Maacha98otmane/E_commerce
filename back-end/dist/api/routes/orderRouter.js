"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var router = _express["default"].Router();

exports.router = router;
router.get("/getUserOrder/:id", _controllers.getUserOrder);
router.get("/getAll", _controllers.getAllOrder);
router.get("/getMonthlyOrder", _controllers.getMonthlyOrder);
router.post("/create", (0, _middlewares.Auth)('ADMIN'), _controllers.createOrder);
router["delete"]("/delete/:id", (0, _middlewares.Auth)('ADMIN'), _controllers.deleteOrder);
router.patch("/update/:id", (0, _middlewares.Auth)('ADMIN'), _controllers.updateOrder);