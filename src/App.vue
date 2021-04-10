<template>
  <div id="box">
    <!-- <div id="tabbar"  v-show="$store.state.isTabbarShow"> -->
    <!-- <div id="tabbar"  v-show="isShow"> -->
    <div id="tabbar"  v-show="isTabbarShow">
    <ul>
    <router-link to="/home" tag="button" active-class="myactive">
      <i class="iconfont icon-all"></i>
      home</router-link>
    <router-link to="/film" tag="button" active-class="myactive">
      <i class="iconfont icon-video"></i>
      film</router-link>
    <router-link to="/shoppingcar" tag="button" active-class="myactive">
      <i class="iconfont icon-creditlevelfilling"></i>
      card</router-link>
    <router-link to="/center" tag="button" active-class="myactive">
      <i class="iconfont icon-smile"></i>
      center</router-link>
    </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  // import bus from '@/bus'
  import {mapState} from 'vuex' //ES6导出

export default {
  name: 'App',

  data(){
    return{
      // isShow:true
    }
  },
  mounted(){
    // 加载本地用户数据
    let UserInfo = localStorage.getItem('UserInfo')
    if(UserInfo){
      let InfoArr = UserInfo.split(',')
      // 加载至vuex
      this.$store.commit('GetUserInfo',InfoArr)
      console.log("加载本地缓存用户数据")
    }else{
      console.log("本地无用户数据")
    }
  },
  // computed:{
  //   isShow(){
  //     return this.$store.state.isTabbarShow;
  //   }
  // }

  // computed: mapState(["isTabbarShow"]),

     computed:{
       ...mapState(["isTabbarShow"]),   //ES6展开合并运算符

     }

  // beforeMount () {
  //   bus.$on("maizuo",(data)=>{
  //     this.isShow = data;
  //   })
  // }



}
</script>

<style scoped>
  @import url("./assets/iconfont/iconfont.css");
*{
  margin: 0px;
  padding: 0px;
}
  html,body{
    height: 100%;
    margin: 0px;
  }
  #tabbar{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 60px;
    background: white;
    z-index: 2;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;

}
ul{
  display: flex;
}
ul li,button{
  flex: 1;
  line-height: 60px;
  text-align: center;
  outline: none;
  border-left: none;
}
.myactive{
    background-color: gray;
}
</style>

// 针对移动端elementUI的适应样式
<style>
@media screen and (max-width: 750px) {
  .el-message-box {
    width: 60% !important;
  }
}
</style>