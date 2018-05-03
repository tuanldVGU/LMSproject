var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

passport.serializeUser((user,done) =>{
	done(null,user.id);
});

passport.deserializeUser((id,done)=>{
	User.findByID(id, (err,user) =>{
		done(err, user);
	});
});

passport.use('local.login', new LocalStrategy({
	usrnameField: 'usrname',
	passwrdField: 'password',
	passReqToCallback: true
}, (req, usrname,password,done) =>{
	User.findOne({'usrname': usrname}, (err,user) =>{
		if (err){
			return done(err);
		}

		var messages = [];

		if (!user){
			messages.push('User is not existed')
			return done(null, false, req.flash('error', messages));
		}
		if (!user.validPassword(password)){
			messages.push('Password is not valid')
			return done(null, false, req.flash('error', messages));
		}

		return done(null, user);
	})
}));