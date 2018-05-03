var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var usrSchema = mongoose.Schema({
	usrname: {type: String, require: true},
	password: {type: String},
	role: {type: String, default: ''}
});

usrSchema.methods.encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
}

usrSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', usrSchema);