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
router.post("/login", _controllers.loginSuperAdmin);
router.get("/getOne/:id", _controllers.getSuperAdmin);
router.post("/create", _controllers.createSuperAdmin);
router.patch("/update/:id", (0, _middlewares.Auth)('SUPERADMIN'), _controllers.updateSuperAdmin);
router.get("/logout", _controllers.logoutSuperAdmin);