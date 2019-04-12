var express = require("express");
var path = require("path")
var app =express();
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var goods = require("./routers/goods");
var user = require("./routers/user");
var bodyParser = require("body-parser");


app.use(cookieParser());
app.use(
  session({
    secret: "CatOnKeyboard",
    key: "shop",
    proxy: "true",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*10 },
    store: new MongoStore({
    	url: 'mongodb://localhost/shop',
      ttl: 24 * 60 * 60 // = 14 days. Default
    }) 
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname,'public')));


app.use(goods)
app.use(user)

app.listen(3000,function(){
	 console.log("running in 3000")
})