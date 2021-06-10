<template>
  <div class="filmContainer" id="filmContainer">
    <div class="roll">
        <swiper ref="myswiper" class="swiper">
            <div  class="swiper-slide" v-for="data in datalist" :key="data"><img :src="data"/>
            </div>
        </swiper>
    </div>
    <div class="fixhlep" v-if="!IsFixed"></div>
      <el-button :class="IsFixed? 'film-headerInv':'fixed'" type="primary" @click="backTop">回到顶部</el-button>
      <div class='film-header'>
          <router-link to="/film/now-playing" tag="button" active-class="myactive">
              <i class="el-icon-video-play"></i>
                当前热映
          </router-link>
          <router-link to="/film/coming-soon" tag="button" active-class="myactive">
        <i class="el-icon-date"></i>
                即将上映
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
        datalist:["https://pic.maizuo.com/usr/movie/1c6eb83cf6db66388e32f3af2aae3324.jpg?x-oss-process=image/quality,Q_70","https://pic.maizuo.com/usr/movie/4d36a39bc82a763a57b3db377ab5cda5.jpg?x-oss-process=image/quality,Q_70","https://pic.maizuo.com/usr/movie/67bba86581801acc4d3a9f0765db3afc.jpg","https://pic.maizuo.com/usr/movie/2dc58177bcbcc47e58cd37bdb101f14d.jpg"],
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
    background-color: #409EFF;
    outline: none;
  }
  .myactive{
    background-color: white;
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
