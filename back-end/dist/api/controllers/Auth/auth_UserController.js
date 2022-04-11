"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = void 0;

var _user = _interopRequireDefault(require("../../models/user.js"));

var _helpers = require("../../helpers");

var logger = require('../../../config/winston');

var login = function login(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  _user["default"].findOne({
    email: email
  }, function (err, result) {
    if (err || !result) {
      return res.status(400).json({
        isLogged: false,
        error: 'User not Found with this email@'
      });
    }

    if (!result.authenticate(password)) {
      return res.status(401).json({
        isLogged: false,
        error: 'Email and Password dont Match !'
      });
    }

    logger.info("login: ".concat(result.email, " logged!"));
    var token = (0, _helpers.createToken)({
      id: result._id,
      role: result.role
    }, result.role);
    res.cookie('token', token, {
      expires: new Date(Date.now() + 4 * 3600000)
    });
    return token ? res.status(200).json({
      isLogged: true,
      token: token
    }) : res.status(500).json({
      isLogged: false,
      error: "cant create token"
    });
  });
};

exports.login = login;

var logout = function logout(req, res) {
  res.clearCookie('token');
  res.json({
    message: "Logout"
  });
};

exports.logout = logout;