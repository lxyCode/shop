var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	
	"username":{
        type:String
	},
	"password":{
        type:String
	},
	"sex":{
		type:Number
	},
	"age":{
		type:String
	},
	"car":
	[
          {
          	"productid":{
                type:String
           },
           "selected":{
           	   type:Boolean
           },
           "number":{
           	   type:Number,
           	   default:0
           }
       }
	],
	"address":[
	    {
           "addressid":{
           	   type:String
           },
           "selected":{
           	   type:Boolean
           }
        }   
	    
	],
	"createTime":{
		type: Date,
		default:Date
	}
})

module.exports = mongoose.model("User",userSchema)

