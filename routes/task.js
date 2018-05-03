var express = require('express');
var router = express.Router();

router.get('/app', (req, res, next) =>{
  var shop1SoldDrink = req.app.get('data').shop1.sold_drink;
  var shop2SoldDrink = shop1SoldDrink;
  res.render('checkout', {title: 'Checkout || myLittleShop',item: shop2SoldDrink});
});

router.get('/employee', (req, res, next) =>{
	var shop1SoldDrink = req.app.get('data').shop1.sold_drink;
  var shop2SoldDrink = shop1SoldDrink;
	res.render('employee', {title: 'Employee || myLittleShop',item : shop2SoldDrink});
});

router.get('/owner', (req, res, next) =>{
	res.render('owner', {title: 'Owner || myLittleShop'});

});

router.get('/signup', (req, res, next) =>{
	res.render('signup', {title: 'Signup || myLittleShop'});

});

module.exports = router;
