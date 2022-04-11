"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _helpers = require("../helpers");

var Auth = function Auth() {
  var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _req$headers, _payload$result;

      var bearer, token, payload;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              bearer = req === null || req === void 0 ? void 0 : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;

              if (bearer) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                error: "unauthorized"
              }));

            case 3:
              token = bearer.split(" ")[1];
              payload = (0, _helpers.verifyToken)(token, role);

              if (payload) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                error: "unauthenticated"
              }));

            case 7:
              if ((payload === null || payload === void 0 ? void 0 : (_payload$result = payload.result) === null || _payload$result === void 0 ? void 0 : _payload$result.role) == "CUSTOMER") {
                req.body.createdBy = payload.result._id;
              }

              next();

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.Auth = Auth;