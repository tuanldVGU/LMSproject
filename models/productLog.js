var mongoose = require('mongoose');

var productLogSchema = new mongoose.Schema({		
	productID: {type: Number, unique: true},
	productName: String,
	price: Number,
	day: {type: Date, default: Date.now}
});

module.exports = mongoose.model('productLogs', productLogSchema);