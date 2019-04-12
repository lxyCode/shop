var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
	"productId":{
		type:Number,
	},
	"productName":{
        type:String
	},
	"productImage":{
		type:String
	},
	"productPrice":{
		type:Number
	},
	"productNumber":{
		type:Number
	},
	"createTime":{
		type: Date,
		default:Date
	}
})

module.exports = mongoose.model("Good",productSchema)

