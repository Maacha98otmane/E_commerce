"use strict";

var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [{
    productId: {
      type: String
    },
    quantity: {
      type: Number,
      "default": 1
    }
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model('Cart', cartSchema);