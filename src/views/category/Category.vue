<template>
  <div class="wrapper" rel="aaa">
    <ul class="content">
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
      <li>32</li>
    </ul>
    
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return{
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{})
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;
  }
</style>
