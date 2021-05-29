<template>
  <div class="filmContainer" id="filmContainer">
    <div class="roll">
        <swiper ref="myswiper" class="swiper">
            <div  class="swiper-slide" v-for="data in datalist" :key="data">{{data}}
            </div>
        </swiper>
    </div>
    <div class="fixhlep" v-if="!IsFixed"></div>
      <el-button :class="IsFixed? 'film-headerInv':'fixed'" type="primary" @click="backTop">回到顶部</el-button>
      <div class='film-header'>
          <router-link to="/film/now-playing" tag="button" active-class="myactive">
              <i class="el-icon-video-play"></i>
                now-playing
          </router-link>
          <router-link to="/film/coming-soon" tag="button" active-class="myactive">
        <i class="el-icon-date"></i>
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
        //  console.log(document.documentElement.scrollTop,this.$refs.myswiper.$el.offsetHeight)
         if(document.documentElement.scrollTop - 48 >= this.$refs.myswiper.$el.offsetHeight){
            // console.log("住手！！");
            this.IsFixed = false;
         }else{
           // console.log("冲冲冲");
           this.IsFixed = true;
         }
       },
      //  返回顶部
       backTop(){
        let timer = setInterval(() => {
          document.documentElement.scrollTop -= 60;
          if (document.documentElement.scrollTop < 10) {
            clearInterval(timer);
          }
        }, 5)
        //  document.getElementById("filmContainer").scrollIntoView();
        // document.documentElement.scrollTop = 400
       }
     }
};
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .film-header{
    display: flex;
  }
  .film-headerInv{
    display: none;
  }
  .fixhlep{
    display: flex;
    height: 40px;
  }
  .fixed{
    z-index: 100;
    position: fixed;
    text-align: center;
    background-color: #409EFF;
    top: 0px;
    width: 100%;
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
