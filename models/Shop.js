var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
  name: String,
  item: 
		[
			{
				productID: {type: Number, unique: true},
				qty_init: Number,
			}	
		]	   
});

module.exports = mongoose.model('shops', ShopSchema);