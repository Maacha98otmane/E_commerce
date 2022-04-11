"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAdmin = exports.searchAdmin = exports.removeAdmin = exports.getAllAdmins = exports.getAdmin = exports.createAdmin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _admin = _interopRequireDefault(require("../models/admin"));

var logger = require('../../config/winston');

var EmailSend = require('../helpers/email');

var createAdmin = function createAdmin(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      email = _req$body.email,
      password = _req$body.password;
  var admin = new _admin["default"]({
    username: username,
    email: email,
    password: password
  });
  admin.save( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, admin) {
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
              admin.hashed_password = undefined;
              admin.salt = undefined;
              subj = "Your Login Info";
              msg = " email : ".concat(admin.email, "\n                password : ").concat(admin.password);
              EmailSend.mail(admin.email, subj, msg);
              logger.info("Admin user:".concat(admin.username, " created!"));
              return _context.abrupt("return", res.json({
                admin: admin,
                msg: "Admin Created Successfully"
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

exports.createAdmin = createAdmin;

var updateAdmin = /*#__PURE__*/function () {
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
            return _admin["default"].findOneAndUpdate({
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
            logger.info("Admin user:".concat(req.body.username, " Updated!"));
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

  return function updateAdmin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateAdmin = updateAdmin;

var removeAdmin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, admin;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _admin["default"].findById({
              _id: id
            });

          case 3:
            admin = _context3.sent;
            admin.remove(function (err, result) {
              if (err) {
                logger.error(err);
              }

              logger.info("Admin user:".concat(admin.username, " deleted!"));
              res.status(200).json({
                status: true,
                message: "Deleted successfully"
              });
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function removeAdmin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.removeAdmin = removeAdmin;

var searchAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var sortBy, order, limit, skip, findArgs, key, id, admin;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sortBy = req.query.sortBy ? req.query.sortBy : '_id';
            order = req.query.order ? req.query.order : 'asc';
            limit = req.query.limit ? parseInt(req.query.limit) : 100;
            skip = parseInt(req.body.skip);
            findArgs = {};

            for (key in req.body.filters) {
              if (req.body.filters[key].length > 0) {}
            }

            id = req.params.id;
            _context4.next = 9;
            return _admin["default"].findById({
              _id: id
            });

          case 9:
            admin = _context4.sent;
            admin.remove(function (err, result) {
              if (err) {
                logger.error(err);
              }

              logger.info("Admin user:".concat(admin.username, " deleted!"));
              res.status(200).json({
                status: true,
                message: "Deleted successfully"
              });
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function searchAdmin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.searchAdmin = searchAdmin;

var getAllAdmins = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var admins;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _admin["default"].find();

          case 3:
            admins = _context5.sent;
            res.status(200).json({
              status: true,
              admins: admins
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(400).json({
              status: false,
              msg: _context5.t0
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getAllAdmins(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getAllAdmins = getAllAdmins;

var getAdmin = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, admin;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _admin["default"].findById({
              _id: id
            });

          case 4:
            admin = _context6.sent;
            res.status(200).json({
              status: true,
              admin: admin
            });
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            res.status(400).json({
              status: false,
              msg: _context6.t0
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));

  return function getAdmin(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAdmin = getAdmin;