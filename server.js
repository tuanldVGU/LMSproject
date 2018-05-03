var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');


var router = express.Router();

var app = express();

require('./config/passport');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/lms');

app.use(express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
	secret: 'This is my test key',
	resave: false,
	saveUninitialized: false,
	store : new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

require('./routes/user') (app,passport);

// // catch 404 and forward to error handler
// app.use(function(req,res,next){
// 	next(createError(404));
// });

// //error handler
// app.use(function(err,req,res,next){
// 	res.locals.message = err.message;
// 	res.locals.error = res.app.get('env') === 'development' ? err : {};

// 	//error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });

// connect database server-side
var MongoClient = require('mongodb').MongoClient;
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

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  const db = client.db('mylittleshop')
  console.log("Connected correctly to server");
  //db.collection('secondCollection').update({"name":"firstDocument"},{$pull:{"barcode":[{"3":"Fnta"}]}},{multi:true})
  findDocuments(db, function(docs) {
    exports.getDataShop1 = function() {
      return docs;
    }
    console.log(docs.shop1.sold_drink[1])
    app.set('data',docs)
    //console.log(docs.barcode);
    
  });
  
  
});

app.listen(3000, function(){
	console.log("App running on port 3000");
})