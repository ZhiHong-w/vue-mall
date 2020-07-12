<template>
  <div id="detail" >
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" rel="nav" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import {bounce} from "../../common/bounce";
  import {itemListenerMixin,backTop} from "../../common/mixin";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    mixins: [itemListenerMixin,backTop],
    data(){
      return{
        iid: null,
        topImages: [],
        goods:{},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImageListener: null,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetail(this.iid).then(res=>{
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        this.shop = new Shop(data.shopInfo);
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        };
        // this.$nextTick(()=>{
        //   this.themeTopYs = [];
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // });
      });
      getRecommend().then(res=>{
        this.recommends = res.data.list;
      });
      this.getThemeTopY = bounce(()=>{
        this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
      },100);
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      },
      contentScroll(position){
        const positionY = -position.y;
        let len = this.themeTopYs.length;
        for(let i=0; i < len-1; i++){
          if((this.currentIndex !== i) && ((positionY >= this.themeTopYs[i])
            && (positionY < this.themeTopYs[i+1]))){
            this.currentIndex = i;
           // console.log(i);
           // this.$refs.nav.currentIndex = this.currentIndex;
          }
        };

        if(position.y < -1000){
          this.isShowBackTop = true;
        } else{
          this.isShowBackTop = false;
        };
      },
      addToCart(){
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        this.$store.dispatch('addCart',product).then(res=>{
          //console.log(res);
          this.$toast.show(res,2000)
        });
      },
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImageListener);
    },
    updated() {

    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
