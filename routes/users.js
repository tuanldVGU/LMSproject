var express = require('express');
var router = express.Router();
var User = require('../models/user');
var checkAuth = require('../middleware/check-auth');

// Get all users
router.get('/users',checkAuth, function(req,res){
  User.find(function(err,users){
    if (err) res.send(err);
    res.json(users);
  });
});

// Get single user
router.get('/user/:user_id',checkAuth, function(req,res){
  User.findOne({_id: req.params.user_id}
    ,function(err,user){
    if (err) res.send(err);
    res.json(user);
  });
});

// Sign in user
router.post("/users", function (req, res, next) {
 if (req.body.loguser && req.body.logpassword) {
    User.authenticate(req.body.loguser, req.body.logpassword, function (error, user, token) {
      if (error || !user) {
        var err = new Error('Wrong user or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        if (user.role=="Employee") 
          {
            res.cookie('role','employee');
            res.cookie('x-access-token',token);
            return res.redirect('/employee');
          }
        else 
          {
            res.cookie('role','admin');
            res.cookie('x-access-token',token);
            return res.redirect('/home');
          }
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// Sign up user
router.post("/user/signup", function (req, res, next) {

  if (req.body.username &&
    req.body.password &&
    req.body.role &&
    req.body.shop) {

    var userData = {
      email: req.body.username,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      shop: req.body.shop,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
        alert;
      } else {
        req.session.userId = user._id;
        return res.redirect('/home');
      }
    });

  }else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// Delete user
router.delete('/user/:user_id',checkAuth, function(req,res){
  User.remove({
    _id : req.params.user_id
  },function(err, user){
      if (err) res.send(err);
      
      User.find(function(err,user){
      if (err) res.send(err);
      res.json(user);
  });
  });
});

// Update user
router.put('/user/:user_id',checkAuth, function(req,res){
  var user = req.body;
  
  User.findByIdAndUpdate({
    _id : req.params.user_id
  },user,
  {new: true},function(err, user){
      if (err) res.send(err)
      res.json(user);
  });

});

// Update user
router.patch('/user/:user_id',checkAuth, function(req,res){
  var users = req.body;
  var upTask ={};
  for (const tsk of users){
    upTask[tsk.propName] = tsk.value;
  } 
  User.update({_id: req.params.user_id}, {$set: upTask},function(err, user){
      if (err) res.send(err)
      res.json(user);
  });

});
module.exports = router;
