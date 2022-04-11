"use strict";

var mongoose = require('mongoose');

var costumerSchema = new mongoose.Schema({
  Address: {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  zipCode: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required: true
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
  collection: "customers"
});
module.exports = mongoose.model('Costumer', costumerSchema);