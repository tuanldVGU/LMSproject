const jwt = require('jsonwebtoken');
var config = require('../config/jsonconfig');

module.exports = (req, res, next) =>{
	try {
		// check header or url parameters or post parameters for token
		var role = req.headers.cookie.split(';')[1].split('=')[1];
		var decoded;
		var token,role;
        var rc = req.headers.cookie;
	    rc.split(';').forEach(function(parts) {
	        // part.name = parts.split('=')[0];
	        // part.value = parts.split('=')[1];	
	        if((parts.split('=')[0] == ' x-access-token')||(parts.split('=')[0] == 'x-access-token')){
	    		token = parts.split('=')[1];
	    	}
	    	if((parts.split('=')[0] == ' role')||(parts.split('=')[0] == 'role')){
	    		role = parts.split('=')[1];
	    	}
	    });
		if (role == 'employee') {
			decoded = jwt.verify(token, config.secretEmployee);
		}
		else {
			decoded = jwt.verify(token, config.secretAdmin);
		}
		req.body.userData = decoded;
		next();
	} catch (error) {
		return res.json({message: "Please log in again"});
	}	
}