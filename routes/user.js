module.exports = (app,passport) => {

	app.get('/employee', (req, res, next) =>{
		var shop1SoldDrink = req.app.get('data').shop1.sold_drink;
		var shop2SoldDrink = shop1SoldDrink;
		app.get('/', (req, res, next) =>{
		res.render('index', {title: 'Login || myLittleShop'});

	});
		res.render('employee', {
			title: 'Employee || myLittleShop',
			item : shop2SoldDrink
		});

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
