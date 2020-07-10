import {bounce} from "./bounce";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  mounted(){
    const refresh = bounce(this.$refs.scroll.refresh,10);//在浏览器中最后执行，虽然没有延迟时间
    this.itemImageListener = ()=>{
      refresh();
    };
    this.$bus.$on('itemImageLoad', this.itemImageListener);
  }
};

export const backTop = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
    }
  }
};
