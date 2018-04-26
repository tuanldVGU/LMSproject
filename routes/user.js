module.exports = (app,passport) => {
	app.get('/', (req, res, next) =>{
		res.render('index', {title: 'Login || myLittleShop'});

	});

	app.get('/employee', (req, res, next) =>{
		res.render('employee', {title: 'Employee || myLittleShop'});

	});

	app.post('/',passport.authenticate('login',{
		successRedirect: '/employee',
		failureRedirect: '/',
		failureFlash: true
	}));


	app.get('/owner', (req, res, next) =>{
		res.render('owner', {title: 'Owner || myLittleShop'});

	});

}
