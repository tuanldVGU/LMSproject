var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product');
var checkAuth = require('../middleware/check-auth');

/* GET ALL PRODUCTS */
router.get('/products',checkAuth, function(req, res, next) {


  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/product/:id',checkAuth, function(req, res, next) {
  //console.log(req.params.id);
  Product.findOne({name:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE SHOP */
router.post('/product',checkAuth, function(req, res, next) {
  //console.log(req.body);
  var shop = {
    name: req.body.name,
    item:[]
  }
  Product.create(shop, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE SHOP */
router.put('/product/:id',checkAuth, function(req, res, next) {
  console.log(req.body);
  Product.findByIdAndUpdate(req.params.id, req.body, {new:true},function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE SHOP */
router.delete('/products/:id',checkAuth, function(req, res, next) {
  //console.log(req);
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;