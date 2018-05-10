var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var productLog = require('../models/productLog');
var checkAuth = require('../middleware/check-authE');

/* GET ALL PRODUCTS */
router.get('/productLogs',checkAuth, function(req, res, next) {


  productLog.find(function (err, productLogs) {
    if (err) return next(err);
    res.json(productLogs);
  });
});

/* GET SINGLE productLog BY ID */
router.get('/productLog/:id',checkAuth, function(req, res, next) {
  //console.log(req.params.id);
  productLog.findOne({name:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE PRODUCT LOG */
router.post('/productLog',checkAuth, function(req, res, next) {
  productLog.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;