<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="special" ref="tabControl1" @tabClick="tabClick" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="special" ref="tabControl2" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {itemListenerMixin,backTop} from "../../common/mixin";

  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,

      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMixin,backTop],
    data(){
      return {
        banners: [],
        recommends: [],
        special: ['流行','新款','精选'],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImageListener: null,
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      },
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y;
      this.$bus.$off('itemImageLoad', this.itemImageListener);
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
    },
    methods:{
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page++;

          this.$refs.scroll.finishPullUp();
        })
      },
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position){
        if(position.y < -1000){
          this.isShowBackTop = true;
        } else{
          this.isShowBackTop = false;
        }

        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
    /*padding-top: 44px;*/
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
    /*position: fixed;*/
    /*left: 0px;*/
    /*right: 0px;*/
    /*top: 0px;*/
    /*z-index: 1;*/
  }
  .tab-control{
    /*position: sticky;!*static + fixed(top距离到时)*!*/
    position: relative;
    /*top: 44px;*/
    z-index: 1;
  }
  .content{
    /*height: calc(100vh - 93px);*/
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>
