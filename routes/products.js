var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product');

/* GET ALL PRODUCTS */
router.get('/products', function(req, res, next) {
  console.log(req);

  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/products/:id', function(req, res, next) {
  console.log(req);
  Product.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE SHOP */
router.post('/product/:name', function(req, res, next) {
  console.log(req);
  var shop = {
    name: req.params.name,
    item:[]
  }
  Product.create(shop, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE SHOP */
router.put('/products/:id', function(req, res, next) {
  console.log(req);
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE SHOP */
router.delete('/products/:id', function(req, res, next) {
  console.log(req);
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;