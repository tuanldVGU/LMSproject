var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Get all users
router.get('/users', function(req,res){
  User.find(function(err,users){
    if (err) res.send(err);
    res.json(users);
  });
});

// Get single user
router.get('/user/:user_id', function(req,res){
  User.findOne({_id: req.params.user_id}
    ,function(err,user){
    if (err) res.send(err);
    res.json(user);
  });
});

// Save user
router.post('/user', function(req,res,next){
});

// Delete user
router.delete('/user/:user_id', function(req,res){
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
router.put('users/:user_id', function(req,res){
  var user = req.body;
  var updTask = {};

  if (user.isDone){
    updTask.isDone = user.isDone;
  }
  if (user.username){
    updTask.username = user.username;
  }

  if (!updTask){
      res.status(400);
      res.json({
        "error": "Bad Data"
      }) 
  } else {
      User.update({
        _id : req.params.user_id
      },updTask,{},function(err, user){
          if (err) res.send(err);
          
          User.find(function(err,user){
          if (err) res.send(err);
          res.json(user);
      });
      });
  }


});
module.exports = router;
