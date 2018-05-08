const jwt = require('jsonwebtoken');
var config = require('../config/jsonconfig');

module.exports = (req, res, next) =>{
	try {
		// check header or url parameters or post parameters for token
  		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		var token = req.headers.cookie.split(';')[2].split('=')[1];
		const decoded = jwt.verify(token, config.secretAdmin);
		req.body.userData = decoded;
		next();
	} catch (error) {
		return res.json({message: "Please log in again"});
	}	
}