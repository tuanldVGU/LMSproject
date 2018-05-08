var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Product');
var checkAuth = require('../middleware/check-authE');

/* GET ALL ItemS */
router.get('/items',checkAuth, function(req, res, next) {
    
  Item.find(function (err, items) {
    if (err) return next(err);
    res.json(items);
  });
});

/* GET SINGLE Item BY ID */
router.get('/item/:id',checkAuth, function(req, res, next) {
  //fsconsole.log(req.params.id);
  Item.findOne({productID:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE SHOP */
router.post('/item',checkAuth, function(req, res, next) {
  Item.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE SHOP */
router.put('/item/:id',checkAuth, function(req, res, next) {
  console.log(req.body);
  Item.findByIdAndUpdate(req.params.id, req.body, {new:true},function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE SHOP */
router.delete('/item/:id',checkAuth, function(req, res, next) {
    Item.remove({
        _id : req.params.id
      },function(err, user){
          if (err) res.send(err);
          
          Item.find(function(err,user){
          if (err) res.send(err);
          res.json(user);
      });
      });
    });

module.exports = router;