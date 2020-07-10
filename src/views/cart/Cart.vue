<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <span slot="center">购物车({{cartLength}})</span>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {mapGetters} from 'vuex';
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      ...mapGetters(['cartLength','cartList'])
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
