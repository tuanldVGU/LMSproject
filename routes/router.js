var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) =>{
	res.render('index', {title: 'Login || myLittleShop'});
});

router.get('/home', checkAuth, (req,res, next) =>{
	  console.log(req.cookies);
      res.render('dashboard', {title: 'Dashboard || myLittleShop'});
});

router.get('/app',checkAuth, (req, res, next) =>{
  res.render('checkout', {title: 'Checkout || myLittleShop'});
});

router.get('/signup',checkAuth, (req, res, next) =>{
  res.render('signup', {title: 'Signup || myLittleShop'});

});

router.get('/profile',checkAuth, (req, res, next) =>{
  res.render('modifyUser', {title: 'Modify user || myLittleShop'});
});

router.get('/chart',checkAuth, (req, res, next) =>{
  res.render('chart', {title: 'Modify user || myLittleShop'});
});

router.get('/addItem',checkAuth, (req, res, next) =>{
  res.render('addItem', {title: 'Modify user || myLittleShop'});
});
router.get('/employee', checkAuth, (req, res, next) =>{
  res.render('employee', {title: 'Modify user || myLittleShop',shopName : req.body.userData.shop, employee: req.body.userData.username});
});
router.get('/barcodeScanner',checkAuth, (req, res, next) =>{
  res.render('barcodeScanner', {title: 'barcodeScanner || myLittleShop'});
});

module.exports = router;
