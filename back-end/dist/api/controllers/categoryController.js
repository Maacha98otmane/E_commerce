"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.getCategory = exports.getAllCategory = exports.deleteCategory = exports.addCategory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _category = _interopRequireDefault(require("../models/category"));

var getCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, doc;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.prev = 1;
            _context.next = 4;
            return _category["default"].find({
              _id: id
            });

          case 4:
            doc = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              status: true,
              message: doc
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(400).json({
              status: false,
              message: _context.t0.message
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function getCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCategory = getCategory;

var getAllCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var docs;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _category["default"].find();

          case 3:
            docs = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              status: true,
              message: docs
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).json({
              status: false,
              message: _context2.t0.message
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getAllCategory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllCategory = getAllCategory;

var addCategory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var name, category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            name = req.body.name;
            _context3.next = 4;
            return _category["default"].create({
              name: name
            });

          case 4:
            category = _context3.sent;
            return _context3.abrupt("return", res.status(201).json({
              status: true,
              message: category
            }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(400).json({
              status: false,
              message: _context3.t0.message
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function addCategory(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addCategory = addCategory;

var deleteCategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _category["default"].findOneAndRemove({
              _id: id
            });

          case 4:
            res.status(200).json({
              status: true,
              message: "deleted successfully"
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({
              status: false,
              message: _context4.t0.message
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function deleteCategory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteCategory = deleteCategory;

var updateCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, name;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            name = req.body.name;
            _context5.next = 5;
            return _category["default"].findOneAndUpdate({
              id: id
            }, {
              name: name
            });

          case 5:
            res.status(200).json({
              status: true,
              message: "updated successfully"
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            res.status(400).json({
              status: false,
              message: _context5.t0.message
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function updateCategory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateCategory = updateCategory;