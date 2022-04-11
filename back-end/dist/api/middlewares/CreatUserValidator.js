"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatUserValidator = void 0;

var CreatUserValidator = function CreatUserValidator(req, res, next) {
  req.check('username', 'Username is Required !').notEmpty();
  req.check('email', 'Email is Required !').notEmpty().isEmail();
  req.check('password').notEmpty().isLength({
    min: 6,
    max: 10
  }).withMessage('Password must between 6 and 10 Caracters');
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      error: errors[0].msg
    });
  }

  next();
};

exports.CreatUserValidator = CreatUserValidator;