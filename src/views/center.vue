<template>
  <div>
    Center页面
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
