<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item" :class="{active: currentIndex===index}" @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar,
    },
    props:{
      currentIndex:{
        type: Number,
        default(){
          return 0;
        }
      }
    },
    data(){
      return{
        titles: ['商品','参数','评论','推荐'],
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .back img{
    margin-top: 11px;
  }
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
