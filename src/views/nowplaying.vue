<template>
  <div class="nowplayingbox">
    <ul v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
     infinite-scroll-distance="0"
     infinite-scroll-immediate-check = false>
      <li v-for="data in datalist" :key="data.index">
        <img :src="data.poster" @click="handleClick(data.filmId,data.name,data.nation,data.category,data.synopsis,data.poster,data.actors)"/>
        <h3 style="color: #409eff;">{{data.name}}</h3>
        <p class="grade" v-if="data.grade">观众评分: <span>{{data.grade}}</span></p>
        <p v-else class="grade2">暂无评分</p>
        <p class="actor">主演: <span>{{data.actors | actorfilter}}</span></p>
        <p class="actor">价格: <span>{{data.price}}</span></p>
        <el-button v-if="!data.isbuy"  type="primary" class="buybutton" size="mini" @click="buyTicket(data.index)" round>加入购物车</el-button>
        <el-input-number v-if="data.isbuy" v-model="num[data.index]" class="inputNum"  @change="handleChange(data.index)" :min="0" :max="50"></el-input-number>
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
      if(data === undefined){
        return '未知'
      }
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
      num:[],
    };
  },

  mounted(){
    if(this.$store.state.nowplayList.length === 0){
      console.log("重新获取数据")
      axios({
        url:"https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=3831972",
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res=>{
        console.log(res.data.data.films);
        this.total = res.data.data.total;
        this.datalist = res.data.data.films;
        console.log(res.data.data.total)
        // 增加一个数据Index和isbuy
        for(let i = 0; i < this.datalist.length; i++){
          this.datalist[i].index = i;
          this.datalist[i].isbuy = false;
          this.datalist[i].buynum = 1;
          // 随机生成票价
          this.datalist[i].price = Math.floor(Math.random()*10 + 25);
          this.datalist[i].isSelect = true;
        }
        for(let i = 0; i < this.total; i++){
          this.num[i] = 1
        }
      })
    }else{
      console.log("读取缓存数据");
      this.datalist = this.$store.state.nowplayList;
      // this.datalist.forEach((item,index)=>{
      //   console.log("电影名",item.name)
      //   console.log("电影票价",item.price)
      // })
      this.total =  this.$store.state.Nowtotal;
      this.current = this.$store.state.NowCurrent;
      // 根据total定义数据的indexlength
      for(let i = 0; i < this.datalist.length; i++){
        this.num[i] = this.datalist[i].buynum;
      }
    }
  },
  beforeDestroy(){
    let ShoppingList = [];
    for(let i = 0; i < this.datalist.length; i++){
      if(this.datalist[i].isbuy === true){
        ShoppingList.push(this.datalist[i]);
      }
    }
    this.$store.commit("SaveToShoppingCar",ShoppingList);
    this.$store.commit("nowplayListMutation",this.datalist);
    this.$store.commit("NowTotalSave",this.total);
    this.$store.commit("NowCurrentSave",this.current);
    // 规范一下vuex
    // this.$store.state.Nowtotal = this.total;
    // this.$store.state.NowCurrent = this.current;
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
      let thisCurrent = this.current;
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
        url:`https://m.maizuo.com/gateway?cityId=440300&pageNum=${thisCurrent}&pageSize=10&type=1&k=3831972`,
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res=>{
        let beforelenth = this.datalist.length;
        let newlength = this.datalist.length + res.data.data.films.length;
        let addlist = res.data.data.films;
        this.datalist = [...this.datalist,...addlist];
        for(let i = beforelenth; i < newlength; i++){
          this.datalist[i].index = i;
          this.datalist[i].isbuy = false;
          this.datalist[i].buynum = 1;
          this.datalist[i].price = Math.floor(Math.random()*10 + 25);
          this.datalist[i].isSelect = true;
        }
      console.log(this.datalist)
      this.loading = false;
      Indicator.close();
      })
    },
    handleChange(index){
      this.datalist[index].buynum = this.num[index];
      if(this.datalist[index].buynum === 0){
        this.datalist[index].isbuy = false;
        this.datalist[index].buynum = 1;
        // 强制更新
        this.$forceUpdate();
      }
      console.log(this.datalist[index]);
    },
    buyTicket(index){
      this.num[index] = this.datalist[index].buynum;
      this.datalist[index].isbuy = true;
      // 修改后强制更新组件
      this.$forceUpdate();
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
  list-style: none;
  overflow: hidden;
  padding: 10px;
}
.grade,.grade2{
  font-size: 14px;
  color: #409eff;
}
.actor{
  font-size: 12px;
  color: #409eff;
}
.buybutton{
  float: right;
  margin-top: 50px;
  margin-right: 10px;
}
.inputNum{
  float: right;
  margin-top: 38px;
}
.nowplayingbox{
  height: 100%;
  overflow: hidden;
}
</style>
