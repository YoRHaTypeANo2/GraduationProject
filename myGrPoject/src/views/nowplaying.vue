<template>
  <div class="nowplayingbox">
    <ul v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
     infinite-scroll-distance="0"
     infinite-scroll-immediate-check = false>
      <li v-for="data in datalist" :key="data.filmId"  @click="handleClick(data.filmId,data.name,data.nation,data.category,data.synopsis,data.poster,data.actors)">
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
  import router from "../router"
  import axios from 'axios'
  import Vue from 'vue'
  import { Indicator } from 'mint-ui'

    Vue.filter("actorfilter",function(data){
        let newlist = data.map(item=>item.name);
        return newlist.join(' ');
    })

  export default{
    name:"nowplaying",
  data(){
    return{
      datalist:[],
      loading:false,
      current:1,
      total:0,
    };
  },

  mounted(){
    axios({
      url:"https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2513751",
      headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res=>{
      console.log(res.data.data.films);
    this.datalist = res.data.data.films;
    })

  },
  methods:{
    handleClick(id,name,nation,category,synopsis,poster,actors){
      console.log(id,name,nation,synopsis,poster,actors)
      this.$router.push({ name: 'mydetail',
      params: { id : id , name : name , nation : nation , category : category , synopsis : synopsis , poster : poster , actors : actors} });
    },
    loadMore(){
      this.loading = true;
      this.current ++ ;
      let  thisCurrent  = this.current;
      if(this.datalist.length === this.total){
      console.log("到底了")
        return;
      }
      console.log(`这是第${thisCurrent}页`)
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });

      // let Url = `https://m.maizuo.com/gateway?cityId=110100&pageNum=${thisCurrent}&pageSize=10&type=1&k=2446725`
      // let Url = "'https://m.maizuo.com/gateway?cityId=110100&pageNum='+thisCurrent+'&pageSize=10&type=1&k=2446725'"
      axios({
        url:`https://m.maizuo.com/gateway?cityId=110100&pageNum=${thisCurrent}&pageSize=10&type=1&k=2446725`,
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res=>{
        console.log(res.data.data.films);
      this.datalist = [...this.datalist,...res.data.data.films];
      this.loading = false;
      this.total = res.data.data.total;
      Indicator.close();
      })
    }

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
/* .nowplayingbox{

} */
</style>
