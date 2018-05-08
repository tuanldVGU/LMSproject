var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config/jsonconfig');


var userSchema = new mongoose.Schema({
  email: {type: String , unique: true, required: true, trim: true},
	username: {type: String , unique: true, required: true, trim: true},
	password: {type: String},
	role: {type: String, default: ''},
  shop: {type: String},
	salt: {type: String},
	hash: {type: String}
});

//authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email})
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {

          if (user.role == "Employee"){ var key = config.secretEmployee}
          else { var key = config.secretAdmin}
          const token = jwt.sign({
            username: user.username,
            userID: user._id,
            shop: user.shop
          },key,
          {
            expiresIn: '1h'
          });

          return callback(null, user, token);
          res.json({
            success: true,
            token: token
          });
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', userSchema);
module.exports = User;