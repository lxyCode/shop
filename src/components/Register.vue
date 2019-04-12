<template>
  <div class="hello">
     
             <p><input type="text" v-model="nickname" placeholder="用户名"></p>
             <p><input type="password"  v-model="password" placeholder="密码"></p>
             <p><input type="radio" name="sex" value="0" v-model="picked">男<input type="radio" name="sex" v-model="picked"  value="1">女</p>
             <p><input type="number" v-model="age"  placeholder="年龄"></p>
             <p><button @click="register">确定</button></p>
     
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
        nickname:"",
        password:"",
        picked:0,
        age:""
    }
  },
  mounted(){
       //this.init()
      
  },
  methods:{
        register(){
            this.$ajax.post("/register",{
                 username:this.nickname,
                 password:this.password,
                 sex:this.picked,
                 age:this.age
            }).then((res) => {

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
