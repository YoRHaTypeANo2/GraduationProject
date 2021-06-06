<template>
  <div>
    <router-link tag="button" to="/city" class="CityTag">{{cityname? cityname:'未定位'}}</router-link>
    <h2 class="cinemas">影院</h2>
    <div class="cinema"  :style="mystyle">
      <el-button type="info" center=true v-if="UnLoc" @click="SelectCity" style="background-color:#409eff;">未定位城市，请先选择</el-button> 
      <ul v-if="datalist" style="margin-top:20px;">
        <li  v-for="data in datalist" :key="data.cinemaId" style="border: 1px solid #409eff;">
          <p style="font-size: 20px;">{{data.name}}</p>
          <p style="font-size: 16px; color:gray;">联系电话：{{data.phone? data.phone:'暂无'}}</p>
          <p style="font-size: 15px; color:gray;">地址：{{data.address}}</p>
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
            id = 370100
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
  margin-top: 10px;
  text-align: center;
  color:#409eff;
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
ul{
  padding-bottom: 60px;
}
ul li{
  padding: 20px;
  padding-left: 0;
  left: 0;
}
.CityTag{
  margin-top: -5px;
  width: 70px;
  height: 30px;
  position: absolute;
  background-color: #409eff;
  color: white;
  text-decoration: none;
  border-radius: 40px;
}
</style>


