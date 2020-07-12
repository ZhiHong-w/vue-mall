import Vue from "vue";
import Vuex from 'vuex'

import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    cartList: [],
  },
  mutations:{
    addCounter(state, payload){
      payload.count++;
    },
    addToCart(state, payload){
      payload.checked = true;
      state.cartList.push(payload);
    }
  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve, reject) =>{
        let oldProduct = null;
        for(let item of context.state.cartList){
          if(item.iid === payload.iid){
            oldProduct = item;
          }
        }
        if(oldProduct){
          context.commit('addCounter',oldProduct);
          resolve('商品添加购物车成功')
        }else{
          payload.count = 1;
          context.commit('addToCart',payload);
          resolve('商品添加购物车成功')
        }
      })
    }
  },
  getters,
});

export default store;
