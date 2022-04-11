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
router.get("/getOne/:id", _controllers.getCategory);
router.get("/getAll", _controllers.getAllCategory);
router.post("/create", (0, _middlewares.Auth)('ADMIN'), _controllers.addCategory);
router["delete"]("/delete/:id", (0, _middlewares.Auth)('ADMIN'), _controllers.deleteCategory);
router.patch("/update/:id", (0, _middlewares.Auth)('ADMIN'), _controllers.updateCategory);