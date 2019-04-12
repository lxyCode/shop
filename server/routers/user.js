var express = require("express");
var app = express()
var router = express.Router();
var mongoose = require("mongoose");
var md5 = require('md5-node');
var Goods = require('../models/goods');
var Users = require('../models/user');

 
mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true});

var a ="";




router.post("/register", (req, res) => {
     var param = req.body;
     param.password = md5(md5(param.password));

     Users.findOne({"username":param.username},(err,data)=>{
          if(err){
              return res.json({
                 code:"0",
                 msg:"数据库错误"
              })
          }
           
          if(data){
              return res.json({
                 code:"1",
                 msg:"用户已存在"
              })
          }

          new Users(param).save((err)=>{
              if(err){
                  return res.json({
                      code:0,
                      msg:"数据库错误"
                  })
              }

              res.json({
                  code:1,
                  msg:"注册成功"
              })
            })
     })
});


router.post("/login",function(req,res){
    Users.findOne({
      username:req.body.username,
      password:md5(md5(req.body.password))
    },(err,data)=>{
          if(err){
              return res.json({
                code:"0",
                msg:"数据库错误"
              })
          }

          if(!data){
             return res.json({
                code:"1",
                msg:"用户名或密码错误"
             })
          }
          
          req.session.user = data;
          console.log(req.session.user._id)

          res.json({
              code:1,
              msg:"登录成功"
      })

    })
})


router.get("/cartlist",(req,res)=>{
     Users.findOne({"_id":req.session.user._id},(err,data)=>{
         if(err){
              return res.json({
                code:0,
                msg:err.message
              });
          }

          if(data){

              var productid=[];

              data.car.forEach((item)=>{
                   productid.push(item.productid)
              })

              //console.log(productid)

              Goods.find({"_id":{$in:productid}},(err,doc)=>{
                    if(err){
                        return res.json({
                          code:0,
                          msg:err.message
                        });
                    }

                    if(doc){
                        var cartlist = [] 
                        data.car.forEach((item,i)=>{
                             cartlist.push(doc[i])
                            
                        })
                         
                      


                        res.json({
                          result:cartlist
                        })
                    }   
              })

          }
     })
})


module.exports = router