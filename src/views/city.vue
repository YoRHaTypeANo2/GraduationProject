<template>
  <div>
  <mt-index-list>
    <mt-index-section :index="data.index" v-for="data in datalist"  :key = "data.index">
      <div @click="handleClick(city.cityId,city.name)" v-for = "city in data.list" :key = "city.cityId">
      <mt-cell :title="city.name"></mt-cell>
      </div>
    </mt-index-section>
  </mt-index-list>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{

    data(){
      return {
        datalist:[]
      }
    },

  mounted(){

    axios({
          url:"https://m.maizuo.com/gateway?k=7604899",
          headers:{
              'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257","bc":"110100"}',
              'X-Host': 'mall.film-ticket.city.list'
              }
        }).then(res=>{
      this.datalist = this.handleCity(res.data.data.cities);
      })
    },
    methods:{
      handleCity(datalist){
      var letterArr = [];
      for(var i = 65;i < 91;i++){
        letterArr.push(String.fromCharCode(i))
          };
        var newlist = [];
        for(var j=0;j<letterArr.length;j++){
          var arr = datalist.filter(item=>item.pinyin.substring(0,1)===letterArr[j].toLowerCase())
              if(arr.length>0){
                newlist.push({
                  index:letterArr[j],
                  list:arr
                })
              }
            }
            console.log(newlist);
            return newlist;
          },
      handleClick(id,name){
        localStorage.setItem("cityId",id);
        localStorage.setItem("cityName",name);
        console.log(name);
        this.$router.push(`/home`)
      }
    },


}


</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
</style>
