"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var router = _express["default"].Router();

exports.router = router;
// import {
//     CreatUserValidator,
//     Auth
// } from "../middlewares"
router.post("/login", _controllers.loginAdmin);
router.get("/getOne/:id", _controllers.getAdmin);
router.get("/getAll", _controllers.getAllAdmins);
router.post("/create", _controllers.createAdmin);
router["delete"]("/delete/:id", _controllers.removeAdmin);
router.patch("/update/:id", _controllers.updateAdmin);
router.get("/logout", _controllers.logoutAdmin);