var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/users', function(req,res){
  User.find(function(err,users){
    if (err) res.send(err);
    res.json(users);
  });
});

router.post('/users', function(req,res){
  
});

router.delete('users/:user_id', function(req,res){
  Todo.remove({
    _id : req.params.user_id
  },function(err, user){
      if (err) res.send(err);
      
      User.find(function(err,users){
      if (err) res.send(err);
      res.json(users);
  });
  });
});

module.exports = router;
