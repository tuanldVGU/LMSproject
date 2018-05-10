var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var debug = require('debug')('mylittleshop:server');
var path = require("path");
var methodOverride = require('method-override'); 
var morgan = require('morgan'); 
const PORT = process.env.PORT || 3000;
var http = require('http');

var app = express();

/*
Database and Models
*/

app.use(express.static(path.join(__dirname, 'public')));
var url = 'mongodb://admin:admin@ds014578.mlab.com:14578/mylittleshop';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function (){
	// we're connected!
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
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(__dirname +'public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(methodOverride());
app.use(morgan('dev'));

/*
Routes
*/

// Handling CORS errors
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

// Restful api routes
var routes = require('./routes/router')
var users = require('./routes/users');
var products = require('./routes/products')
var orders = require('./routes/orderList')
var items = require('./routes/item')
app.use('/', routes);
app.use('/api', users);
app.use('/api', products);
app.use('/api', orders);
app.use('/api', items);


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

http.createServer(app).listen(PORT,function(){
	console.log("App running on port "+ PORT);
});

// app.listen(PORT, function(){
// 	console.log("App running on port "+ PORT);
// })

