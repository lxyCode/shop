import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodsList'
import GoodsCart from '@/views/GoodsCart' 
import addProduct from '@/components/AddProduct'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goodlist',
      name: 'goodlist',
      component: GoodList
    },
    {
      path: '/addProducts',
      name: 'addProduct',
      component: addProduct
    }
    ,
    {
      path: '/register',
      name: 'register',
      component: Register
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: Login
    }
    ,
    {
      path: '/goodcart',
      name: 'goodcart',
      component: GoodsCart
    }
  ]
})
