<template>
  <div class="contaioner">
    <div class="img">
   <img :src="this.$route.params.poster" />
    </div>
   <h2 class="Name">{{$route.params.name}}</h2>
   <p class="Nation">{{$route.params.nation}}</p>
   <p class="Category">{{$route.params.category}}</p>
   <p class="synopsis">{{$route.params.synopsis}}</p>
   <br/>
   <p>演职人员</p>
   <div class="DSwiper" >
          <swiper>
           <div  class="swiper-slide" v-for="data in datalist" :key="data.index">
           <img  class="avatarimg" :src="data.avatarAddress" />
           <p class="ActorName">{{data.name}}</p>
           <p class="ActorRole">{{data.role}}</p>
           </div>
          </swiper>
   </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import swiper from './Dswiper'
  import {HIDE_TABBAR_MUTATION,SHOW_TABBAR_MUTATION} from '../../type/index'
  // import bus from '@/bus'
  export default{
    components:{
      swiper
    },
    data(){
      return{
      };
    },
    name:"CSdetail",
    props:[],
    data(){
      return{
        datalist:this.$route.params.actors
      };
    },
    beforeMount() {
      // this.$store.state.isTabbarShow = false
      // 这么做并不合理
      // this.$store.commit(HIDE_TABBAR_MUTATION,false);
    },
    beforeDestroy() {
      // this.$store.commit(SHOW_TABBAR_MUTATION,true);
    }


  };
</script>

<style scoped>
  .contaioner {
  }
*{
  margin: 0px;
  padding: 0px;
}
li{
  list-style: none;
}
.Nation,.Category{
  font-size: 13px;
}
.synopsis{
  font-size: 13px;
}
.img{
 text-align: center;
}
.avatarimg{
  width: 85px;
  height: 85px;
}
.DSwiper{
  height: 220px;
}
.ActorName,.ActorRole{
  width: 85px;
  font-size: 10px;
  text-align: center;
}
.ActorName{
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}

</style>
