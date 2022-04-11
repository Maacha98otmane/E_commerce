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
router.get("/getOne/:id", _controllers.getBrand);
router.get("/getAll", _controllers.getAllBrand);
router.post("/create", (0, _middlewares.Auth)('ADMIN'), _controllers.addBrand);
router["delete"]("/delete/:id", (0, _middlewares.Auth)('ADMIN'), _controllers.deleteBrand);
router.patch("/update/:id", (0, _middlewares.Auth)('ADMIN'), _controllers.updateBrand);