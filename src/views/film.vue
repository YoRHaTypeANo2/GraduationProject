<template>
  <div class="filmContainer">
    <div class="roll">
        <swiper ref="myswiper" class="swiper">
            <div  class="swiper-slide" v-for="data in datalist" :key="data">{{data}}
            </div>
        </swiper>
    </div>
    <div class="fixhlep" v-if="!IsFixed"></div>
      <div :class="IsFixed?'film-header':'fixed'">
          <router-link to="/film/now-playing" tag="button" active-class="myactive">
              <i class="iconfont icon-hot"></i>
                now-playing
          </router-link>
          <router-link to="/film/coming-soon" tag="button" active-class="myactive">
        <i class="iconfont icon-clock"></i>
                coming-soon
          </router-link>
      </div>
    <router-view></router-view>
  </div>
</template>

<script>
import swiper from './swiper'
export default{
    components:{
      swiper

    },
    data(){
      return{
        datalist:["卖座网站现在没有轮播了","所以做一个静态文件","随便看看","就好了"],
        myswiper:[],
        IsFixed:true
      };
    },
     mounted(){
      window.onscroll = this.handleScroll;
     },
     beforeDestroy() {
       console.log("beforeDestroy");
       window.onscroll = null;
     },
     methods:{
       handleScroll(){
         // console.log(document.documentElement.scrollTop,this.$refs.myswiper.$el.offsetHeight)
         if(document.documentElement.scrollTop - 48 >= this.$refs.myswiper.$el.offsetHeight){
            // console.log("住手！！");
            this.IsFixed = false;
         }else{
           // console.log("冲冲冲");
           this.IsFixed = true;
         }
       }
     }
};
</script>

<style scoped>
  @import url("../assets/iconfont/iconfont.css");
  *{
    padding: 0;
    margin: 0;
  }
  .film-header{
    display: flex;
  }
  .fixhlep{
    display: flex;
    height: 40px;
  }
  .fixed{
    display: flex;
    position: fixed;
    top: 0px;
    width: 100%;
    background: transparent;
    animation: fadein 2s;
  }
  button{
    flex: 1;
    height: 40px;
    background-color: white;
    outline: none;
  }
  @keyframes fadein{
    0%{
      transform: translateY(-40px);
    }
    100%{
      transform: translateY(0px);
    }
  }
</style>
