var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var debug = require('debug')('mylittleshop:server');

var app = express();

/*
Database and Models
*/


var url = 'mongodb://admin:admin@ds014578.mlab.com:14578/mylittleshop';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function (){
	// we're connected!
});

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

/*
Middlewares and configurations 
*/

//Use sessions for tracking logins
app.use(session({
	secret: 'Testing',
	resave: true,
	saveUninitialized: false,
	store : new MongoStore({mongooseConnection: db})
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());


/*
Routes
*/

var routes = require('./routes/user');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

/*
Start server
*/
app.listen(3000, function(){
	console.log("App running on port 3000");
})