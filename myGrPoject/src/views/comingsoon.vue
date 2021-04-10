<template>
  <div>
    <ul>
      <li v-for="data in this.$store.state.comingList" :key="data.filmId"  @click="handleClick(data.filmId,data.name,data.nation,data.category,data.synopsis,data.poster,data.actors,data.isPresale)">
        <img :src="data.poster" />
        <h3>{{data.name}}</h3>
        <p class="grade" v-if="data.grade">观众评分:{{data.grade}}</p>
        <p v-else class="grade2">暂无评分</p>
        <p class="actor">主演:{{data.actors | actorfilter}}</p>
      </li>
    </ul>
    <br/><br/><br/>
  </div>
</template>

<script>
import Vue from 'vue'
import router from "../router"
import { Toast } from 'mint-ui'

  Vue.filter("actorfilter",function(data){
        let newlist = data.map(item=>item.name);
        return newlist.join(' ');
    })
  export default{
    name:"comingsoon",
  data(){
    return{

    };
  },
  mounted(){
    if(this.$store.state.comingList.length === 0){
      this.$store.dispatch("getComingListAction");
    }else{
      console.log("使用了缓存数据")
    }
  },

  methods:{
    handleClick(id,name,nation,category,synopsis,poster,actors,presale){
      console.log(id,name,nation,synopsis,poster,actors)
      this.$router.push({ name: 'CSdetail',
      params: { id : id , name : name , nation : nation , category : category , synopsis : synopsis , poster : poster , actors : actors} });
    if(!presale){
      Toast({
        message: '该影片目前没有排期，看看其他电影吧！',
        position: 'middle',
        duration: 2000
      });
      }
    },
    


  }
};
</script>

<style scoped>
*{
    margin: 0px;
    padding: 0px;
}
ul li img{
  float: left;
  width: 100px;

}
ul li{
  overflow: hidden;
  padding: 10px;
}
.grade,.grade2{
  font-size: 14px;
}
.actor{
  font-size: 12px;
}

</style>
