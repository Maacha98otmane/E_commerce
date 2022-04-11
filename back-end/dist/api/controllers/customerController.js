"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCustomer = exports.deleteCustomer = exports.createCustomer = exports.confirmEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _customer = _interopRequireDefault(require("../models/customer"));

var _user2 = _interopRequireDefault(require("../models/user"));

var _email = _interopRequireDefault(require("../helpers/email"));

var _order = _interopRequireDefault(require("../models/order"));

var createCustomer = function createCustomer(req, res) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      email = _req$body.email,
      password = _req$body.password,
      Address = _req$body.Address,
      zipCode = _req$body.zipCode,
      phone = _req$body.phone,
      city = _req$body.city;
  var UserData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: "CUSTOMER"
  };
  var user = new _user2["default"](UserData);
  user.save(function (err, User) {
    if (err) {
      // logger.error(err);
      return res.status(400).send(err);
    }

    var CostumerData = {
      Address: Address,
      city: city,
      zipCode: zipCode,
      phone: phone,
      user: user._id,
      _id: user._id
    };
    var costumer = new _customer["default"](CostumerData);
    costumer.save( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, Manager) {
        var _user, id, subj, msg;

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
                //Email Verification
                id = user._id.id;
                subj = "Inoformation";
                msg = "confirm_email : http://localhost:3030/api/customer/confirmEmail/".concat(id);

                _email["default"].mail(email, subj, msg);

                user.hashed_password = undefined;
                user.salt = undefined; // logger.info(`Costumer user:${req.body.username} created!`);

                return _context.abrupt("return", res.json({
                  user: user,
                  costumer: costumer
                }));

              case 13:
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
}; //delete customer


exports.createCustomer = createCustomer;

var deleteCustomer = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, customer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _customer["default"].findById({
              _id: id
            });

          case 4:
            customer = _context2.sent;
            customer.remove();
            return _context2.abrupt("return", res.json({
              message: "Customer deleted successfully!"
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              status: false,
              message: "Customer not found"
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function deleteCustomer(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // update user


exports.deleteCustomer = deleteCustomer;

var updateCustomer = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, _req$body2, firstName, lastName, email, password, Address, city, zipCode, phone, costumerData, userData, customer, user;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, password = _req$body2.password, Address = _req$body2.Address, city = _req$body2.city, zipCode = _req$body2.zipCode, phone = _req$body2.phone;
            costumerData = {
              Address: Address,
              city: city,
              zipcode: zipCode,
              phone: phone
            };
            userData = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
            };
            _context3.next = 7;
            return _customer["default"].findOneAndUpdate({
              _id: id
            }, costumerData, {
              "new": true
            });

          case 7:
            customer = _context3.sent;
            _context3.next = 10;
            return _user2["default"].findOneAndUpdate({
              _id: id
            }, userData, {
              "new": true
            });

          case 10:
            user = _context3.sent;
            return _context3.abrupt("return", res.status(400).json({
              message: "Customer updated successfully!"
            }));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json({
              status: false,
              message: "Customer not found"
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));

  return function updateCustomer(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateCustomer = updateCustomer;

var confirmEmail = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _customer["default"].findOneAndUpdate({
              id: id
            }, {
              "isVerified": true
            });

          case 4:
            res.status(200).json({
              status: true,
              message: "Your Account is now Verified"
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

  return function confirmEmail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.confirmEmail = confirmEmail;