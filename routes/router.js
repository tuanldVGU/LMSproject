var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');
var checkAuthE = require('../middleware/check-authE');

router.get('/', (req, res, next) =>{
	res.render('index', {title: 'Login || myLittleShop'});
});

router.get('/home', checkAuth, (req,res, next) =>{
	  console.log(req.headers);
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

router.get('/modifyItem',checkAuth, (req, res, next) =>{
  res.render('modifyItem', {title: 'Modify item || myLittleShop'});
});


router.get('/inventory',checkAuth, (req, res, next) =>{
  res.render('chart', {title: 'Inventory || myLittleShop'});
});

router.get('/addItem',checkAuth, (req, res, next) =>{
  res.render('addItem', {title: 'Add item || myLittleShop'});
});

<<<<<<< HEAD
router.get('/employee', checkAuthE, (req, res, next) =>{
=======
router.get('/addItemtoShop',checkAuth, (req, res, next) =>{
  res.render('addItemtoShop', {title: 'Add item || myLittleShop'});
});

router.get('/employee', checkAuth, (req, res, next) =>{
>>>>>>> 30e65d91abebfa11e2d1dfcf7683483bce5b9e91
  res.render('employee', {title: 'Checkout || myLittleShop',shopName : req.body.userData.shop, employee: req.body.userData.username});
});

router.get('/barcodeScanner',checkAuth, (req, res, next) =>{
  res.render('barcodeScanner', {title: 'barcodeScanner || myLittleShop'});
});

router.get('/barcode-tools',checkAuth, (req, res, next) =>{
  res.render('barcode-tools', {title: 'Barcode Tools || myLittleShop'});
});

router.get('/bar-chart',checkAuth, (req, res, next) =>{
  res.render('bar-chart', {title: 'Bar chart || myLittleShop'});
});

router.get('/pie-chart',checkAuth, (req, res, next) =>{
  res.render('pie-chart', {title: 'Pie chart || myLittleShop'});
});

router.get('/polar-area-chart',checkAuth, (req, res, next) =>{
  res.render('polar-area-chart', {title: 'Polar area chart || myLittleShop'});
});

router.get('/logout', (req, res, next) =>{
  res.clearCookie('x-access-token');
  res.redirect('/');
});
module.exports = router;
