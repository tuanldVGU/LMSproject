const jwt = require('jsonwebtoken');
var config = require('../config/jsonconfig');

module.exports = (req, res, next) =>{
	try {
		// check header or url parameters or post parameters for token
  		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		const decoded = jwt.verify(token, config.secret);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.json({});
	}	
}