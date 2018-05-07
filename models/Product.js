var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  shop1: {
  	"sold_drink": {
  		productID: Number,
  		productName: String,
  		quantity_in_stock: Number,
		price: Number,
		timestamp: { type: Date, default: Date.now }
  	}
  }     
});

module.exports = mongoose.model('secondCollection', ProductSchema);