<template>
       <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>GoodsCart</span>
      </nav-bread>
      <div class="container">
  <div class="cart">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>My Cart</span></h2>
    </div>
    <div class="item-list-wrap">
      <div class="cart-item">
        <div class="cart-item-head">
          <ul>
            <li>Items</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
            <li>Edit</li>
          </ul>
        </div>
        <ul class="cart-item-list">
          <li v-for="item in cartlist">
            <div class="cart-tab-1">
              <div class="cart-item-check">
                <a href="javascipt:;" class="checkbox-btn item-check-btn" >
                  
                </a>
              </div>
              <div class="cart-item-pic">
                <img :src="item.productImage">
              </div>
              <div class="cart-item-title">
                <div class="item-name">{{item.productName}}</div>
              </div>
            </div>
            <div class="cart-tab-2">
              <div class="item-price">{{item.productPrice}}</div>
            </div>
            <div class="cart-tab-3">
              <div class="item-quantity">
                <div class="select-self select-self-open">
                  <div class="select-self-area">
                    <a class="input-sub">-</a>
                    <span class="select-ipt">{{item.number}}</span>
                    <a class="input-add">+</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-tab-4">
              <div class="item-price-total">100</div>
            </div>
            <div class="cart-tab-5">
              <div class="cart-item-opration">
                <a href="javascript:;" class="item-edit-btn">
                  <svg class="icon icon-del">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-foot-wrap">
      <div class="cart-foot-inner">
        <div class="cart-foot-l">
          <div class="item-all-check">
            <a href="javascipt:;">
                  <span class="checkbox-btn item-check-btn">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
              <span>Select all</span>
            </a>
          </div>
        </div>
        <div class="cart-foot-r">
          <div class="item-total">
            Item total: <span class="total-price">500</span>
          </div>
          <div class="btn-wrap">
            <a class="btn btn--red">Checkout</a>
          </div>
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
    import './../assets/css/checkout.css'
    import NavHeader from '@/components/Navheader'
    import NavFooter from '@/components/NavFooter'
    import NavBread from '@/components/NavBread'

    export default{
        data(){
            return{
                cartlist:[]
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
            this.getCartList()
        },

        methods:{
            getCartList(){
              this.$ajax.get("/cartlist").then((res)=>{
                    this.cartlist = res.data.result
              })
            }
        }
       
     }
</script>
