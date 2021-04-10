<template>
  <div>
    <h2 class="cinemas"><router-link to="/city">{{cityname}}</router-link>影院</h2>
    <div class="cinema"  :style="mystyle">
      <el-button type="info" center=true v-if="UnLoc" @click="SelectCity()">未定位城市，请先选择</el-button> 
      <el-button type="info" center=true v-if="UnLoc" @click="SelectCity2()">+new1----{{count1}}</el-button> 
      <el-button type="info" center=true v-if="UnLoc" @click="SelectCity3()">+new2----{{count2}}</el-button>
      <el-button type="info" center=true v-if="UnLoc" @click="SelectCity33()">+new3----{{count3}}</el-button>
      <el-button type="info" center=true v-if="UnLoc" @click="SelectCity4()">-new1----{{count1}}</el-button>
      <el-button type="info" center=true v-if="UnLoc" @click="SelectCity5()">-new2----{{count2}}</el-button>
      <ul v-if="datalist">
        <li  v-for="data in datalist" :key="data.cinemaId">
          <p style="font-size: 20px;">{{data.name}}</p>
          <p style="font-size: 20px;">{{data.phone}}</p>
          <p style="font-size: 15px;">{{data.address}}</p>
        </li>
      </ul>
    </div>
    <!-- 不让底部被tabbar挡住 -->
    <br/><br/><br/>
  </div>
</template>

<script>
  import axios from 'axios'
  import BetterScroll from 'better-scroll'
  export default{
    name:"home",
  data(){
    return{
      count1:0,
      count2:0,
      count3:0,
      datalist:null,
      UnLoc:false,
      mystyle:{
          height:'0px',
      },
      cityname:'',
    };
  },
  mounted() {
    let id = localStorage.getItem("cityId");
    let name = localStorage.getItem("cityName");
    if(!id){
      this.GetLoc()
    }else{
      this.cityname = name;
      axios({
      url:`https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=4449341`,
      headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
        },
      }).then(res=>{
      console.log(res.data.data.cinemas);
      this.datalist = res.data.data.cinemas;
      this.$nextTick(()=>{
        new BetterScroll("ul",{
          scrollbar:{
            fade: true,
            interactive: false,
          },
        });
      })
    })
    }
    this.count1 = this.$store.state.ShoppingList[0].TicketCount
    this.count2 = this.$store.state.ShoppingList[1].TicketCount
    this.count3 = this.$store.state.ShoppingList[2].TicketCount
    this.mystyle = document.documentElement.clientHeight-60 +'px';
    console.log("看看",this.$store.state.ShoppingList)
  },
  methods:{
    GetLoc: async function() {
      let res = await this.$store.dispatch('getCurrentCityName');
      console.log(res.name)
      this.cityname = res.name;
      this.$msgbox({
      title: '',
      message: `检测到您在${this.cityname},是否切换到该城市`,
      center:true,
      showCancelButton: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
      beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = '切换中...';
        setTimeout(() => {
          done();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
          }, 300);
          let id = localStorage.getItem("cityId");
          if(!id){
            id = 430100
          }
          axios({
            url:`https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=4449341`,
            headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257","bc":"110100"}',
            'X-Host': 'mall.film-ticket.cinema.list'
            },
          }).then(res=>{
            console.log(res.data.data.cinemas);
            this.datalist = res.data.data.cinemas;
            localStorage.setItem("cityId",id);
            localStorage.setItem("cityName",this.cityname);
            this.$nextTick(()=>{
            new BetterScroll("ul",{
              scrollbar:{
                fade: true,
                interactive: false,
              },
            });
          })
        })
        this.$message({  
          type: 'success',
          message: `已为您切换至${this.cityname}`
        });
      },1000);
        }else{
          console.log('否')
          this.cityname = '';
          this.UnLoc = true;
          console.log(this.UnLoc)
          done();
          }
        }
      })
    },
    SelectCity(){
      this.$router.push('/city')
      this.UnLoc = false
    },
    SelectCity2(){
      let ADOBJ = {
        name:'a',
        count:1,
        price:20
      }
      this.$store.commit('ShoppingListAdd',ADOBJ)
      this.count1 = this.$store.state.ShoppingList[0].TicketCount
      this.count2 = this.$store.state.ShoppingList[1].TicketCount
      this.count3 = this.$store.state.ShoppingList[2].TicketCount
    },
    SelectCity3(){
      let ADOBJ = {
        name:'b',
        count:1,
        price:24
      }
      this.$store.commit('ShoppingListAdd',ADOBJ)
      this.count1 = this.$store.state.ShoppingList[0].TicketCount
      this.count2 = this.$store.state.ShoppingList[1].TicketCount
      this.count3 = this.$store.state.ShoppingList[2].TicketCount
    },
    SelectCity33(){
      let ADOBJ = {
        name:'c',
        count:1,
        price:24
      }
      this.$store.commit('ShoppingListAdd',ADOBJ)
      this.count1 = this.$store.state.ShoppingList[0].TicketCount
      this.count2 = this.$store.state.ShoppingList[1].TicketCount
      this.count3 = this.$store.state.ShoppingList[2].TicketCount
    },
    SelectCity4(){
      let DLOBJ = {
        name:'a',
        count:1,
        price:20
      }
      this.$store.commit('ShoppingListDel',DLOBJ)
      this.count1 = this.$store.state.ShoppingList[0].TicketCount
      this.count2 = this.$store.state.ShoppingList[1].TicketCount
      this.count3 = this.$store.state.ShoppingList[2].TicketCount
    },
    SelectCity5(){
      let DLOBJ = {
        name:'b',
        count:1,
        price:24
      }
      this.$store.commit('ShoppingListDel',DLOBJ)
      this.count1 = this.$store.state.ShoppingList[0].TicketCount
      this.count2 = this.$store.state.ShoppingList[1].TicketCount
      this.count3 = this.$store.state.ShoppingList[2].TicketCount
    }
  }
};
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
.cinemas{
  text-align: center;
}
.el-button{
  width: 50%;
  height: 100px;
  margin:25%;
}
.cinema{
  /* overflow: hidden; */
  position: relative;
}
ul li{
  padding: 20px;
  padding-left: 0;
  left: 0;
}
</style>


