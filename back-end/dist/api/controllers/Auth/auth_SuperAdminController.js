"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutSuperAdmin = exports.loginSuperAdmin = void 0;

var _helpers = require("../../helpers");

var SuperAdmin = require('../../models/superadmin');

// const signup = (req, res) => {
//     const superAdmin = new SuperAdmin(req.body);
//     superAdmin.save((err, superAdmin) => {
//         if (err) {
//             return res.status(400).send(err)
//         }
//         res.send(superAdmin)
//     })
// }
var loginSuperAdmin = function loginSuperAdmin(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  SuperAdmin.findOne({
    email: email
  }, function (err, superAdmin) {
    if (err || !superAdmin) {
      return res.status(400).json({
        isLogged: false,
        error: 'User not Found with this email@'
      });
    }

    if (!superAdmin.authenticate(password)) {
      return res.status(401).json({
        isLogged: false,
        error: 'Email and Password dont Match !'
      });
    }

    var token = (0, _helpers.createToken)({
      id: superAdmin._id,
      role: superAdmin.role
    }, "SUPERADMIN");
    res.cookie('tokenSuperAdmin', token, {
      expires: new Date(Date.now() + 4 * 3600000)
    });
    return token ? res.status(200).json({
      isLogged: true,
      token: token,
      superAdmin: superAdmin
    }) : res.status(500).json({
      isLogged: false,
      error: "cant create token"
    });
  });
};

exports.loginSuperAdmin = loginSuperAdmin;

var logoutSuperAdmin = function logoutSuperAdmin(req, res) {
  res.clearCookie('tokenSuperAdmin');
  res.json({
    message: "Logout"
  });
};

exports.logoutSuperAdmin = logoutSuperAdmin;