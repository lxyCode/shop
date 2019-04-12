<template>
  <div class="hello">
     
             <p><input type="text" v-model="username" placeholder="用户名"></p>
             <p><input type="password"  v-model="password" placeholder="密码"></p>
             <p><button @click="register">确定</button></p>
     
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
        username:"",
        password:"",
     
    }
  },
  mounted(){
       //this.init()
      
  },
  methods:{
        register(){
            this.$ajax.post("/login",{
                 username:this.username,
                 password:this.password,
             
            }).then((res) => {
                if(res.data.code == 1){
                      console.log(123);
                      this.$router.push({path: '/goodlist'})
                }
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
