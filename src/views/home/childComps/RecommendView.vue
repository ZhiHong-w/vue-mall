<template>
  <div class="recommend">
    <div v-for="item in recommends" class="item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        props: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .recommend{
   display: flex;
   width: 100%;
   text-align: center;
   font-size: 16px;
   padding-bottom: 25px;
   padding-top: 15px;
   border-bottom: 8px solid #eeeeee;
 }
 .item{
   flex: 1;
 }
 .item img{
    width: 80px;
    height: 80px;
   margin-bottom: 5px;
 }

</style>
