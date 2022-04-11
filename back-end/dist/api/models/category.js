"use strict";

var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxLength: 32,
    trim: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Category', categorySchema);