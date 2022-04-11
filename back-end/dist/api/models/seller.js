"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var mongoose = require('mongoose');

var User = require('./user');

var sellerSchema = new mongoose.Schema({
  document: {
    // data: Buffer,
    // contentType: String
    type: String,
    required: true
  },
  nameStore: {
    // data: Buffer,
    // contentType: String
    type: String,
    required: true
  },
  status: {
    type: String,
    trim: true,
    "enum": {
      values: ['Starter', 'Pro', 'Expert'],
      message: 'is not supported'
    },
    "default": "Starter"
  },
  isVerified: {
    type: String,
    "default": false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
}, {
  collection: "sellers"
});
sellerSchema.pre('remove', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var seller;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            seller = this;
            _context.next = 3;
            return User.deleteOne({
              _id: seller.user
            });

          case 3:
            next();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = mongoose.model('Seller', sellerSchema);