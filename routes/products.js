var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var Product = require('../models/Product.js');
var Schema = mongoose.Schema; 
var Product = mongoose.model("product", new Schema({}), "secondCollection"); 

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

/* SAVE PRODUCT */
router.post('/products', function(req, res, next) {
  console.log(req);
  Product.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PRODUCT */
router.put('/products/:id', function(req, res, next) {
  console.log(req);
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/products/:id', function(req, res, next) {
  console.log(req);
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;