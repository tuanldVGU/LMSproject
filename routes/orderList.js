var express = require('express');
var router = express.Router();
var Order = require('../models/orderList');
var checkAuth = require('../middleware/check-authE');
/* GET ALL ORDER */
router.get('/orders',checkAuth, function(req, res, next) {


    Order.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE ORDER BY ID */
  router.get('/order/:id',checkAuth, function(req, res, next) {
    //console.log(req.params.id);
    Order.findOne({name:req.params.id}, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* CREATE ORDER */
  router.post('/order',checkAuth, function(req, res, next) {
    //console.log(req.body);
    var orderList = {
        shop: req.body.shop,
        item: req.body.item,
        type: req.body.type
    }
    Order.create(orderList, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;