var express = require("express");
var app = express()
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs");
var Goods = require('../models/goods');
var Users = require('../models/user');
const path = require('path')

const multer = require("multer");
const upload = multer({
  dest:"./public/uploads"//上传文件存放路径
});

 
mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true});

const singleMidle = upload.single("productImage");//一次处理一张



router.post("/addProduct", singleMidle, function (req, res) {

    var newProduct = req.body;

    var newName = req.file.path + path.parse(req.file.originalname).ext;
   
   console.log( req.file) 

    fs.rename(req.file.path, newName, function (err) {
        if(err) {
            return res.json({msg:"重命名错误"})
        }
        newProduct.productImage = "http://192.168.30.251:3000\\"+newName;
        
        new Goods(newProduct).save((err)=>{
             if(err){
                return res.json({msg:"数据库错误"})
             }
             res.json({msg:"提交成功"})
        })
    })

});


router.get("/goodList",(req,res)=>{
   
     let priceBlock = req.query["priceBlock"];
     let page = parseInt(req.query["page"]);
     let pageSize = parseInt(req.query["pageSize"]);
     var pageSort = parseInt(req.query["pageSort"])
     let skip = (page-1)*pageSize;
     let priceGt="",priceLte="";
     let params = {}

     
     if(priceBlock != "All"){
         switch(priceBlock){
              case "0": priceGt=0;priceLte=100; break;
              case "1": priceGt=100;priceLte=500; break;
              case "2": priceGt=500;priceLte=1000; break;
              case "3": priceGt=1000;priceLte=5000; break;
         } 

         params = {
            "productPrice":{
                $gt:priceGt,
                $lte:priceLte
            }
         } 

     }
    
     
     let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

     goodsModel.sort({'productPrice':pageSort});
     goodsModel.exec(function (err,doc) {
      if(err){
          res.json({
            code:0,
            msg:err.message
          });
      }else{
          res.json({
              code:'1',
              msg:'',
              data:doc
          });
      }
  })
     
})


router.post("/addCart",(req,res)=>{
     var productid = req.body.productid;
     Users.findOne({"_id":req.session.user._id},(err,data)=>{
          if(err){
              return res.json({
                code:0,
                msg:err.message
              });
          }




          if(data){
             var goodsItem = '';
              data.car.forEach((item)=>{
                   if(item.productid == productid){
                       goodsItem = item
                       item.number++
                   }
              })




              if(goodsItem){
                   data.save(function (err2,data2) {
                      if(err2){
                        return res.json({
                          code:"0",
                          msg:err2.message
                        })
                      }


                      res.json({
                          code:'1',
                          msg:'',
                          result:'suc'
                      })
                  })
              }else{
                  var product = {
                      "productid":productid,
                      "selected":false,
                      "number":1
                  }
                  data.car.push(product)

                  data.save(function (err3,doc3) {
                    if(err3){
                      res.json({
                        code:"1",
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        code:'0',
                        msg:'',
                        result:'suc'
                      })
                    }
                  })
              }


          }
     })
})


module.exports = router