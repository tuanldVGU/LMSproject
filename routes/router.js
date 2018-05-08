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

router.get('/app', (req, res, next) =>{
  res.render('checkout', {title: 'Checkout || myLittleShop'});
});

router.get('/owner', (req, res, next) =>{
  res.render('owner', {title: 'Owner || myLittleShop'});

});

router.get('/signup', (req, res, next) =>{
  res.render('signup', {title: 'Signup || myLittleShop'});

});

router.get('/profile', (req, res, next) =>{
  res.render('modifyUser', {title: 'Modify user || myLittleShop'});
});

router.get('/chart', (req, res, next) =>{
  res.render('chart', {title: 'Modify user || myLittleShop'});
});

router.get('/bar-chart', (req, res, next) =>{
  res.render('bar-chart', {title: 'Modify user || myLittleShop'});
});

router.get('/pie-chart', (req, res, next) =>{
  res.render('pie-chart', {title: 'Modify user || myLittleShop'});
});

router.get('/polar-area-chart', (req, res, next) =>{
  res.render('polar-area-chart', {title: 'Modify user || myLittleShop'});
});

router.get('/addItem', (req, res, next) =>{
  res.render('addItem', {title: 'Modify user || myLittleShop'});
});
router.get('/employee', (req, res, next) =>{
  res.render('employee', {title: 'Modify user || myLittleShop'});
});
router.get('/barcode-tools', (req, res, next) =>{
  res.render('barcode-tools', {title: 'Barcode Tools || myLittleShop'});
});

module.exports = router;
