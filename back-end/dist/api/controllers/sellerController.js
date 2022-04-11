"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSeller = exports.searchSeller = exports.removeSeller = exports.getSellerStatus = exports.getSeller = exports.getAllSellers = exports.createSeller = exports.confirmAccount = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user2 = _interopRequireDefault(require("../models/user.js"));

var _seller = _interopRequireDefault(require("../models/seller"));

var _store = _interopRequireDefault(require("../models/store"));

var logger = require('../../config/winston');

var EmailSend = require('../helpers/email');

var createSeller = function createSeller(req, res) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      email = _req$body.email,
      document = _req$body.document,
      password = _req$body.password,
      Address = _req$body.Address,
      nameStore = _req$body.nameStore,
      phone = _req$body.phone;
  var UserData = {
    firstName: firstName,
    lastName: lastName,
    Address: Address,
    phone: phone,
    email: email,
    password: password,
    role: "SELLER"
  };
  var user = new _user2["default"](UserData);
  user.save(function (err, User) {
    if (err) {
      // logger.error(err);
      return res.status(400).send(err);
    }

    var SellerData = {
      document: document,
      nameStore: nameStore,
      user: user._id,
      _id: user._id
    };
    var seller = new _seller["default"](SellerData);
    seller.save( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, seller) {
        var _user;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return User.findById({
                  _id: _user._id
                });

              case 3:
                _user = _context.sent;

                _user.remove(); // logger.error(err);


                return _context.abrupt("return", res.status(400).send(err));

              case 6:
                user.hashed_password = undefined;
                user.salt = undefined; // logger.info(`Costumer user:${req.body.username} created!`);

                return _context.abrupt("return", res.json({
                  user: user,
                  seller: seller
                }));

              case 9:
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
  });
};

exports.createSeller = createSeller;

var updateSeller = /*#__PURE__*/function () {
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
            return _seller["default"].findOneAndUpdate({
              _id: req.params.id
            }, req.body);

          case 5:
            if (!(req.body.email || req.body.password)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 8;
            return _user2["default"].findOneAndUpdate({
              _id: req.params.id
            }, req.body.email);

          case 8:
            logger.info("Seller user:".concat(req.body.username, " Updated!"));
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

  return function updateSeller(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateSeller = updateSeller;

var removeSeller = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, seller;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _seller["default"].findById({
              _id: id
            });

          case 3:
            seller = _context3.sent;
            seller.remove(function (err, result) {
              if (err) {
                logger.error(err);
              }

              logger.info("Seller user:".concat(seller.username, " deleted!"));
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

  return function removeSeller(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.removeSeller = removeSeller;

var searchSeller = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var sortBy, order, limit, skip, findArgs, key, id, seller;
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
            return _seller["default"].findById({
              _id: id
            });

          case 9:
            seller = _context4.sent;
            seller.remove(function (err, result) {
              if (err) {
                logger.error(err);
              }

              logger.info("Seller user:".concat(seller.username, " deleted!"));
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

  return function searchSeller(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.searchSeller = searchSeller;

var getAllSellers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var sellers;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _seller["default"].find().populate("user");

          case 3:
            sellers = _context5.sent;
            res.status(200).json({
              status: true,
              sellers: sellers
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

  return function getAllSellers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getAllSellers = getAllSellers;

var getSeller = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, seller;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _seller["default"].findById({
              _id: id
            }).populate("user");

          case 4:
            seller = _context6.sent;
            res.status(200).json({
              status: true,
              seller: seller
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

  return function getSeller(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getSeller = getSeller;

var getSellerStatus = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var date, lastYear, data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            date = new Date();
            lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
            _context7.prev = 2;
            _context7.next = 5;
            return _seller["default"].aggregate([{
              $match: {
                createdAt: {
                  $gte: lastYear
                }
              }
            }, {
              $project: {
                month: {
                  $month: "$createdAt"
                }
              }
            }, {
              $group: {
                _id: "$month",
                total: {
                  $sum: 1
                }
              }
            }]);

          case 5:
            data = _context7.sent;
            res.status(200).json(data);
            _context7.next = 12;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](2);
            res.status(500).json(_context7.t0);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 9]]);
  }));

  return function getSellerStatus(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getSellerStatus = getSellerStatus;

var confirmAccount = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, doc, store;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _context8.next = 4;
            return _seller["default"].findOneAndUpdate({
              id: id
            }, {
              "isVerified": true
            }, {
              "new": true
            });

          case 4:
            doc = _context8.sent;

            if (doc) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              status: false,
              msg: "Invalid id"
            }));

          case 7:
            store = new _store["default"]({
              name: doc.nameStore,
              seller: doc._id,
              _id: doc._id
            });
            _context8.next = 10;
            return store.save();

          case 10:
            res.status(200).json({
              status: true,
              message: "Your Account is now Verified"
            });
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);
            res.status(400).json({
              status: false,
              message: _context8.t0.message
            });

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 13]]);
  }));

  return function confirmAccount(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.confirmAccount = confirmAccount;