var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
  name: String,
  item: 
		[
			{
				productID: {type: Number, unique: true},
				quantity_in_stock: Number
			}	
		]	   
});

module.exports = mongoose.model('shops', ShopSchema);