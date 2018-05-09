var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
  name: String,
  item: 
		[
			{
				productID: Number,
				qty_init: Number,
				day_init: {type: Date, default: Date.now }
			}	
		]	   
});

module.exports = mongoose.model('shops', ShopSchema);