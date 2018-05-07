var express = require('express');
var router = express.Router();
var User = require('../models/user');
var MongoClient = require('mongodb').MongoClient;
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
        if (user.role=="Employee") return res.redirect('/app');
        else return res.redirect('/home');
      }
    });
  } else {
    var err = new Error('All fields required.'+ req.body.username +"pw"+ req.body.password +"role"+ req.body.role);
    err.status = 400;
    return next(err);
  }
});



router.get('/app', (req, res, next) =>{
  var shop1SoldDrink = req.app.get('data').shop1.sold_drink;
  res.render('checkout', {title: 'Checkout || myLittleShop',item: shop2SoldDrink});
});

// router.get('/employee', (req, res, next) =>{
//   var shop1SoldDrink = req.app.get('data').shop1.sold_drink;
//   res.render('employee', {title: 'Employee || myLittleShop',item : shop1SoldDrink});
// });

// Update database
var url = 'mongodb://admin:admin@ds014578.mlab.com:14578/mylittleshop';
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('secondCollection');
  // Find some documents
  
  collection.find().toArray(function(err, items) {
    console.log("Found the following records");
    callback(items[0]);
  });


}
MongoClient.connect(url, function(err, client) {
  var datashop1 = []
    const db = client.db('mylittleshop')
    console.log("Connected correctly to server from user.js");
    findDocuments(db, function(docs) {
      exports.getDataShop1 = function() {
        return docs;    
      }
      console.log(docs.shop1.sold_drink.length);
    router.get('/employee', (req, res, next) =>{
      res.render('employee', {title: 'Employee || myLittleShop',item : docs.shop1.sold_drink});
    });
    router.get('/home', (req,res, next) =>{
      for(var i = 0; i<docs.shop1.sold_drink.length;i++)
      res.render('dashboard', {title: 'Dashboard || myLittleShop',item:docs});
    })
    })
    
    //db.collection('secondCollection').update({"name":"firstDocument"},{$pull:{"barcode":[{"3":"Fnta"}]}},{multi:true})
    router.put('/orderListPaid', function(req,res,next){
      var orderList = req.body;
      console.log(req.body)
      for(var i = 0; i<orderList.length;i++)
      {
        console.log("test"+orderList[i].id)
        db.collection('secondCollection').update({"name":"firstDocument", "shop1.sold_drink.productID":orderList[i].id},{$set:{"shop1.sold_drink.$.quantity_in_stock":orderList[i].qtyInStock,"shop1.sold_drink.$.quantity_sold":orderList[i].qtySold}}, (err, result) => {
          if(err) {
            throw err;
          }
          res.send('user updated sucessfully');
        });
      }
    });   
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

router.get('/bar-chart', (req, res, next) =>{
  res.render('bar-chart', {title: 'Bar Chart || myLittleShop'});
});

router.get('/pie-chart', (req, res, next) =>{
  res.render('pie-chart', {title: 'Pie Chart || myLittleShop'});
});

router.get('/polar-area-chart', (req, res, next) =>{
  res.render('polar-area-chart', {title: 'Pie Area Chart || myLittleShop'});
});

router.get('/addItem', (req, res, next) =>{
  res.render('addItem', {title: 'Modify user || myLittleShop'});
});


module.exports = router;
