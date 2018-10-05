var transaction = require('../controllers/transaction.controller');

module.exports = (app) => {
	
	//	GET Purchase Page
	app.get('/stock/buy/:symbol', isLoggedIn, (req, res) => {
		var symbol = req.params.symbol ? req.params.symbol.toUpperCase() : false;
		if(!symbol) { return res.render('dashboard', { error: 'Stock not found' })}
		transaction.getPurchase(req, res, symbol);
	});
	
	//	POST Purchase
	app.post('/stock/buy/:symbol', isLoggedIn, (req, res) => {
		console.log('\n\n\nUser:', req.user, '\n\n\n');
		res.redirect('/stock/buy/' + req.params.symbol);
	});
}

//	Custom middleware for restricting access to protected views
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/');
	}
}