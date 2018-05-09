var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Shop');
var checkAuth = require('../middleware/check-authE');

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
  var upd ={};
  upd.name = req.body.name;
  upd.item = req.body.item;
  upd._id = req.params.id;
  //upd.item.push({"productID":5,"quantity_in_stock":100})
  console.log(upd);
  Product.findByIdAndUpdate(req.params.id, upd, {new:true},function (err, post) {
    if (err){return next(err);} 
    res.json(post);
  });
});


//new 
router.put('/productnew/:id',checkAuth, function(req, res, next) {
  //console.log(req.body);
  var itemUp={productID:req.body.productID,quantity_in_stock:req.body.quantity_in_stock};
  console.log(itemUp)
  Product.findByIdAndUpdate(req.params.id,
    {$push: 
      {
      "item": 
      {
        "productID":req.body.productID,
        "quantity_in_stock":req.body.quantity_in_stock
      }
    }
  }, 
     
      {
        safe: true, 
        upsert: true, 
        new: true
      },function (err, post) {
    if (err){console.log("fuck");return next(err);} 
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