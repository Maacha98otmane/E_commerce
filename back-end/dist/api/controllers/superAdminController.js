"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSuperAdmin = exports.getSuperAdmin = exports.createSuperAdmin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _superadmin = _interopRequireDefault(require("../models/superadmin"));

var logger = require('../../config/winston');

var EmailSend = require('../helpers/email');

var createSuperAdmin = function createSuperAdmin(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      email = _req$body.email,
      password = _req$body.password;
  var superadmin = new _superadmin["default"]({
    username: username,
    email: email,
    password: password
  });
  superadmin.save( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, superadmin) {
      var subj, msg;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 3;
                break;
              }

              logger.error(err);
              return _context.abrupt("return", res.status(400).send(err));

            case 3:
              superadmin.hashed_password = undefined;
              superadmin.salt = undefined;
              subj = "Your Login Info";
              msg = " email : ".concat(superadmin.email, "\n                password : ").concat(superadmin.password);
              EmailSend.mail(superadmin.email, subj, msg);
              logger.info("Super Admin user:".concat(superadmin.username, " created!"));
              return _context.abrupt("return", res.json({
                admin: admin,
                msg: "Super Admin Created Successfully"
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.createSuperAdmin = createSuperAdmin;

var updateSuperAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);
            _context2.prev = 1;

            if (!req.body.username) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return _superadmin["default"].findOneAndUpdate({
              _id: req.params.id
            }, req.body);

          case 5:
            if (!(req.body.email || req.body.password)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 8;
            return User.findOneAndUpdate({
              _id: req.params.id
            }, req.body.email);

          case 8:
            logger.info("Super Admin user:".concat(req.body.username, " Updated!"));
            res.status(200).json({
              status: true,
              message: "Updated successfuly"
            });
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            logger.error(_context2.t0);
            res.status(400).json({
              status: false,
              message: _context2.t0
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function updateSuperAdmin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateSuperAdmin = updateSuperAdmin;

var getSuperAdmin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, superadmin;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _superadmin["default"].findById({
              _id: id
            });

          case 4:
            superadmin = _context3.sent;
            res.status(200).json({
              status: true,
              superadmin: superadmin
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(400).json({
              status: false,
              msg: _context3.t0
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function getSuperAdmin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getSuperAdmin = getSuperAdmin;