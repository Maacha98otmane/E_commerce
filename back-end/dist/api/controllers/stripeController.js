"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.payment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var stripe = require("stripe")(process.env.STRIPE_KEY);

var payment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stripe.charges.create({
              source: req.body.tokenId,
              amount: req.body.amount,
              currency: "usd"
            }, function (stripeErr, stripeRes) {
              if (stripeErr) {
                res.status(500).json(stripeErr);
              } else {
                res.status(200).json(stripeRes);
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function payment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.payment = payment;