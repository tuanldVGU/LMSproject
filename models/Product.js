var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  item: 
		[
			{
				productID: Number,
				productName: String,
				quantity_in_stock: Number,
				quantity_sold: Number,
				price: Number,
			}	
		]	   
});

module.exports = mongoose.model('shops', ProductSchema);