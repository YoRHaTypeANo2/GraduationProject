<template>
  <div style="text-align:center; margin-top:200px;">
    个人中心
  </div>

</template>

<script>
import {mapState} from 'vuex'
  export default{
    name:"center",

  data(){
    return{
    };
  },
  computed:{
       ...mapState(["islog"]),
  },
  mounted() {
    if(this.islog != true){
      this.$router.push({path:'/login'});
    }
  },
};
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}

</style>
