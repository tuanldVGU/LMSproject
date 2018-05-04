var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res, next) =>{
	res.render('index', {title: 'Login || myLittleShop'});
});

router.post("/", function (req, res, next) {

  if (req.body.username &&
    req.body.password &&
    req.body.role &&
    req.body.shop) {

    var userData = {
      email: req.body.username,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      shop: req.body.shop,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
        alert;
      } else {
        req.session.userId = user._id;
        return res.redirect('/home');
      }
    });

  } else if (req.body.loguser && req.body.logpassword) {
    User.authenticate(req.body.loguser, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong user or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/home');
      }
    });
  } else {
    var err = new Error('All fields required.'+ req.body.username +"pw"+ req.body.password +"role"+ req.body.role);
    err.status = 400;
    return next(err);
  }
});

router.get('/home', (req,res, next) =>{
  res.render('dashboard', {title: 'Dashboard || myLittleShop'});
})

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

router.get('/profile', (req, res, next) =>{
  res.render('modifyUser', {title: 'Modify user || myLittleShop'});
})


module.exports = router;
