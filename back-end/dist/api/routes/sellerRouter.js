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
router.get("/getOne/:id", _controllers.getSeller);
router.get("/getAll", (0, _middlewares.Auth)('ADMIN'), _controllers.getAllSellers);
router.get("/getSellerStatus", (0, _middlewares.Auth)('ADMIN'), _controllers.getSellerStatus);
router.post("/create", _controllers.createSeller);
router["delete"]("/delete/:id", (0, _middlewares.Auth)('ADMIN'), _controllers.removeSeller);
router.patch("/update/:id", _controllers.updateSeller);
router.post("/confirmAccount/:id", _controllers.confirmAccount);