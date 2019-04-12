<template>
  <div class="hello">
      <form >
       <div class="input-wrap"><input type="text" placeholder = "请输入名字" v-model="productname"></div> 
       <div class="input-wrap"><input type="text" placeholder = "请输入单价" v-model="productprice"></div> 
       <div class="input-wrap"><input type="number"  placeholder = "请输入数量" v-model="productnumber"></div> 
       <div class="input-wrap"><input type="file" name="" class="upload" @change="uploadPhoto($event)" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/></div> 
       <div class="input-wrap"><button @click="postInfo">提交</button></div>
       </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      productname:"",
      productprice:"",
      productnumber:"",
      productimage:{}
    }
  },
  mounted(){
       //this.init()
       this.$ajax({
                method:'get',
                url:'/goodList',
          
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response.data)       //请求成功返回的数据
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
  },
  methods:{
      
uploadPhoto(e) {
    
   this.productimage=e.target.files[0]
   

  },
  postInfo(){
        
         var formData=new FormData();      //创建form对象
           formData.append("productImage",this.productimage);        //通过append向form对象添加数据
           formData.append("productNumber",this.productnumber);
           formData.append("productName",this.productname);
           formData.append("productPrice",this.productprice);
         
          this.$ajax({
                method:'post',
                url:'/addProduct',
                data:formData
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response.data)       //请求成功返回的数据
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
