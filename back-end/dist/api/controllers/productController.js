"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.getProduct = exports.getAllProduct = exports.deleteProduct = exports.addProduct = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _product = _interopRequireDefault(require("../models/product"));

var _category = _interopRequireDefault(require("../models/category"));

var getProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, doc;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.prev = 1;
            _context.next = 4;
            return _product["default"].find({
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

  return function getProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getProduct = getProduct;

var getAllProduct = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var qNew, qCategory, products;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            qNew = req.query["new"];
            qCategory = req.query.category;
            _context2.prev = 2;

            if (!qNew) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return _product["default"].find().sort({
              createdAt: -1
            }).limit(1).populate("category").populate("brand").populate("store_id");

          case 6:
            products = _context2.sent;
            _context2.next = 24;
            break;

          case 9:
            if (!qCategory) {
              _context2.next = 21;
              break;
            }

            _context2.t0 = _product["default"];
            _context2.next = 13;
            return _category["default"].findOne({
              name: qCategory
            }).then(function (category) {
              return category._id;
            });

          case 13:
            _context2.t1 = _context2.sent;
            _context2.t2 = {
              $in: _context2.t1
            };
            _context2.t3 = {
              category: _context2.t2
            };
            _context2.next = 18;
            return _context2.t0.find.call(_context2.t0, _context2.t3).populate("category").populate("brand").populate("store_id");

          case 18:
            products = _context2.sent;
            _context2.next = 24;
            break;

          case 21:
            _context2.next = 23;
            return _product["default"].find().populate("category").populate("brand").populate("store_id");

          case 23:
            products = _context2.sent;

          case 24:
            res.status(200).json(products);
            _context2.next = 30;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t4 = _context2["catch"](2);
            res.status(500).json(_context2.t4);

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 27]]);
  }));

  return function getAllProduct(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllProduct = getAllProduct;

var addProduct = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var newProduct, product;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newProduct = new _product["default"](req.body);
            _context3.prev = 1;
            _context3.next = 4;
            return newProduct.save();

          case 4:
            product = _context3.sent;
            res.status(200).json(product);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function addProduct(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addProduct = addProduct;

var deleteProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _product["default"].findOneAndRemove({
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

  return function deleteProduct(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteProduct = deleteProduct;

var updateProduct = /*#__PURE__*/function () {
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
            return _product["default"].findOneAndUpdate({
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

  return function updateProduct(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateProduct = updateProduct;