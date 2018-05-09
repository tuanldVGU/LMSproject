var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  shop: String,
  item: 
		[
			{
				productID: {type: Number, unique: true},
				quantity: Number,
			}	
        ],
    day: {type: Date, default: Date.now},
    type: String,
});

module.exports = mongoose.model('orderList', OrderSchema);