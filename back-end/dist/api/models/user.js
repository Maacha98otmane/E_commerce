"use strict";

var _uuid = require("uuid");

var mongoose = require('mongoose');

var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  role: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
}, {
  collection: "users"
}); //Create virtual champs 'password'

userSchema.virtual('password').set(function (password) {
  this._password = password;
  this.salt = (0, _uuid.v4)();
  this.hashed_password = this.cryptPass(password);
}).get(function () {
  return this._password;
}); //Create method for crypt password

userSchema.methods = {
  authenticate: function authenticate(pass) {
    return this.cryptPass(pass) === this.hashed_password;
  },
  cryptPass: function cryptPass(password) {
    if (!password) return '';

    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  }
};
module.exports = mongoose.model('User', userSchema);