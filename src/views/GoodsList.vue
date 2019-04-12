<template>
       <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" @click="priceSort" class="price" :class="{'sort-up':sort}" >Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" >Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" >
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{ 'cur': selectedPrice == 'All' }"  @click="selectPrice('All')">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)"  v-bind:class="{ 'cur': selectedPrice == index }"  @click="selectPrice(index)" >{{item.startPrice}}-{{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                 
                  <li v-for="item in productList">
                
                    <div class="pic">
                      <a href="#"><img :src="item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item._id)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    
      <nav-footer></nav-footer>
    </div>
</template>

<script>
   
    import axios from 'axios'
    import './../assets/css/product.css'
    import NavHeader from '@/components/Navheader'
    import NavFooter from '@/components/NavFooter'
    import NavBread from '@/components/NavBread'

    export default{
        data(){
            return{
               productList:[],
               isActive:false,
               sort:true,
               priceFilter:[
                  {
                    startPrice:'0.00',
                    endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
                ],
                selectedPrice:"All"

            }
        },

        components:{
            NavHeader,
            NavFooter,
            NavBread
        },
        
        /*nickName(){
          return this.$store.state.nickName;
        },
        cartCount(){
          return this.$store.state.cartCount;
        }*/
        
        mounted(){
             this.getProducts();
             this.getCarts()
        },

        methods:{
            addCart(id){
                this.$ajax.post("/addCart",{
                     productid:id
                 }
                  ).then((res)=>{
                     
                      if(res.data.code == "1"){
                         
                           
                      }
                 })
            },
            getProducts(){
                 var param = {
                     priceBlock:this.selectedPrice,
                     page:1,
                     pageSize:4,
                     pageSort:this.sort?1:-1
                 }
                 this.$ajax.get("/goodList",{
                     params:param
                 }
                  ).then((res)=>{
                     
                      if(res.data.code == "1"){
                          this.productList = res.data.data;
                           
                      }
                 })
            },
            getCarts(){
                 
                 this.$ajax.get("/cartlist").then((res)=>{
                     
                     
                 })
            },
            selectPrice(index){
                this.selectedPrice = index;
                this.getProducts()
            },
            priceSort(){
                this.sort = !this.sort
                this.getProducts()
            }
        }
       
     }
</script>
