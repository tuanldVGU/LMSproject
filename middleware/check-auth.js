const jwt = require('jsonwebtoken');
var config = require('../config/jsonconfig');

module.exports = (req, res, next) =>{
	try {
		// check header or url parameters or post parameters for token
  		var token = req.body.token || req.query.token || req.headers['x-access-token'];
  		console.log(token);
		  console.log(req.headers.cookie.split(';')[1].split('=')[1]);
		  var token = req.headers.cookie.split(';')[1].split('=')[1];
		const decoded = jwt.verify(token, config.secret);
		req.body.userData = decoded;
		console.log(decoded)
		next();
	} catch (error) {
		return res.json({message: "fail"});
	}	
}