"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrder = exports.getUserOrder = exports.getMonthlyOrder = exports.getAllOrder = exports.deleteOrder = exports.createOrder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _order = _interopRequireDefault(require("../models/order"));

// create orders
var createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newOrder, savedOrder;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newOrder = new _order["default"](req.body);
            _context.prev = 1;
            _context.next = 4;
            return newOrder.save();

          case 4:
            savedOrder = _context.sent;
            res.status(200).json(savedOrder);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(500).json(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function createOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createOrder = createOrder;

var getUserOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _order["default"].find({
              userId: req.params.id
            });

          case 3:
            orders = _context2.sent;
            res.status(200).json(orders);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getUserOrder(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserOrder = getUserOrder;

var getAllOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _order["default"].find();

          case 3:
            orders = _context3.sent;
            res.status(200).json(orders);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getAllOrder(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllOrder = getAllOrder;

var getMonthlyOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var date, lastMonth, previousMonth, income;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            date = new Date();
            lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
            _context4.prev = 3;
            _context4.next = 6;
            return _order["default"].aggregate([{
              $match: {
                createdAt: {
                  $gte: previousMonth
                }
              }
            }, {
              $project: {
                month: {
                  $month: "$createdAt"
                },
                sales: "$amount"
              }
            }, {
              $group: {
                _id: "$month",
                total: {
                  $sum: "$sales"
                }
              }
            }]);

          case 6:
            income = _context4.sent;
            res.status(200).json(income);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](3);
            res.status(500).json(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 10]]);
  }));

  return function getMonthlyOrder(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMonthlyOrder = getMonthlyOrder;

var deleteOrder = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _order["default"].findByIdAndDelete(req.params.id);

          case 3:
            res.status(200).json("Order has been deleted...");
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json(_context5.t0);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function deleteOrder(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteOrder = deleteOrder;

var updateOrder = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var updatedOrder;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _order["default"].findByIdAndUpdate(req.params.id, {
              $set: req.body
            }, {
              "new": true
            });

          case 3:
            updatedOrder = _context6.sent;
            res.status(200).json(updatedOrder);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function updateOrder(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateOrder = updateOrder;