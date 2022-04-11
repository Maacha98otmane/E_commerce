"use strict";

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
var shippingCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxLength: 150,
    trim: true
  },
  time: {
    type: String,
    require: true,
    maxLength: 2000
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('ShippingCompany', shippingCompanySchema);