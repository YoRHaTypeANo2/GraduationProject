<template>
  <div>
    <h1 class="ShoppingCarTitle">购物车</h1>
    <div class="ShoppingCarContainer">
        <div v-for="data in datalist" :key="data.CinemaName">
          <el-checkbox v-model="checked[data.Id]" border>
          <div>Name:{{data.CinemaName}}</div>
          <div>Count:{{data.TicketCount}}</div>
          <div>Id:{{data.Id}}</div>
          </el-checkbox>
          <!-- <div>{{data.CinemaName}}</div> -->
          <!-- <div>{{data.TicketCount}}</div> -->
        </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"shoppingcar",
    data(){
      return{
        datalist:null,
        checked:[]
      }
    },
    mounted(){
      this.datalist = this.$store.state.ShoppingList
      // 判断是否有保存状态
      if(!this.$store.state.ShoppingSelect){
        let checkArr = []
        for(let i = 0; i < this.datalist.length; i++){
          checkArr.push(false)
      }
      this.checked = checkArr
      console.log(this.datalist)
      console.log(this.checked)
      }else{
        this.checked = this.$store.state.ShoppingSelect
      }
    },
    beforeDestroy(){
      // 离开页面前保存购物车状态
      this.$store.commit('UploadSelect',this.checked)
    }

};
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
.ShoppingCarTitle{
  text-align: center;
}
.ShoppingCarContainer{
  position: relative;
  overflow: hidden;
}
.el-checkbox{
  height: 100px;
  width: 100%
}
</style>
