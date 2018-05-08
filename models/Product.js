var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({		
	productID: {type: Number, unique: true},
	productName: String,
	price: Number,
});

module.exports = mongoose.model('products', ProductSchema);