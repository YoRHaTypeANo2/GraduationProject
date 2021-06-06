<template>
  <div>
    <h1 class="ShoppingCarTitle" style="margin-bottom:20px;">购物车</h1>
    <div class="ShoppingDiv">
    <ul class="ShoppingCarContainer">
      <li v-for="data in datalist" :key="data.newindex" style="list-style:none">
          <!-- <el-checkbox v-if="data.isbuy" class="shoppingCarSingal" v-model="checkList[data.newindex]" @change="SingleSelect(checkList[data.newindex])" border> -->
            <img :src="data.poster" />
            <p class="filmName">{{data.name}}</p>
            <p class="TicketCount">数量：{{data.buynum}}</p>
            <p class="TicketPrice">单价：{{data.price}}</p>
            <p class="TicketTotalPrice">总价：{{data.price * data.buynum}}</p>
          <!-- </el-checkbox> -->
          <el-input-number v-if="data.isbuy" v-model="num[data.newindex]" class="inputNum"  @change="handleChange(data.newindex)" :min="0" :max="50"></el-input-number>
      </li>
    </ul>
    </div>
    <br/><br/><br/>
    <div class="TotalCount">
      <!-- <el-checkbox v-if="ShowAllSelect" v-model="checked" class="AllSelect" @change="AllSelect(checked)">全选</el-checkbox> -->
      <p class="CountPrice">合计:{{TotalCount}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    name:"shoppingcar",
    data(){
      return{
        AllDataList:null,
        datalist:[],
        checkList:[],
        checked:true,
        num:[],
        TotalCount:0,
        ShowAllSelect:false,
      }
    },
    mounted(){
      this.AllDataList = this.$store.state.nowplayList;
      // 获取已购票以及计算合计价格
      this.fillterBuy();
      // 已废弃
    // console.log(this.datalist)
      // this.datalist = this.$store.state.ShoppingList;
      // for(let i = 0; i < this.datalist.length; i++){
      //   // 把购物车内的buynum导入至num
      //   this.datalist.newindex = i;
      //   this.num[i] = this.datalist[i].buynum;
      //   this.checkList[i] = true;
      // }
      // // 判断是否有保存状态
      // if(!this.$store.state.ShoppingSelect){
      //   let checkArr = []
      //   for(let i = 0; i < this.datalist.length; i++){
      //     checkArr.push("true")
      // }
      // this.checkList = checkArr
      // }else{
      //   this.checkList = this.$store.state.ShoppingSelect
      // }
    // },
    // beforeDestroy(){
    //   // 离开页面前保存购物车状态
    //   // this.$store.commit('UploadSelect',this.checkList)
    //   this.$store.commit("SaveToShoppingCar",this.datalist);
    },
    methods:{
      handleChange(newindex){
        let Count = this.num[newindex];
        let NewTotal = 0;
        this.datalist[newindex].buynum = Count;
        for(let i = 0; i < this.datalist.length; i++){
          NewTotal += this.datalist[i].price * this.datalist[i].buynum;          
        }
        this.TotalCount = NewTotal;
        if(Count === 0){
          let data1 = this.datalist[newindex].index;
          let data2 = this.AllDataList[data1];
          data2.buynum = 1;
          data2.isbuy = false;
          // 清空再更新
          this.datalist = [];
          this.num = [];
          this.TotalCount = 0;
          this.fillterBuy();
          this.$forceUpdate();
        }
        // 已废弃
        // this.datalist[index]
        // this.datalist[index].buynum = this.datalist[index].buynum;
        // if(this.datalist[index].buynum === 0){
        //   this.datalist[index].isbuy = false;
        //   this.datalist[index].buynum = 1;
        //   // 强制渲染
        //   this.$forceUpdate();
        // }
        // console.log(this.datalist[index]);
      },
      fillterBuy(select){
        let NEWindex = 0;
        if(select === true){
        }else{
        for(let i = 0; i < this.AllDataList.length; i++){
          if(this.AllDataList[i].isbuy === true){
            this.datalist.push(this.AllDataList[i]);
            this.datalist[NEWindex].newindex = NEWindex;
            this.num[NEWindex] = this.datalist[NEWindex].buynum;
            this.checkList[NEWindex] = this.datalist[NEWindex].isSelect;
            if(this.datalist[NEWindex].isSelect === true){
              this.TotalCount += this.datalist[NEWindex].price * this.datalist[NEWindex].buynum;
            }
            NEWindex++;
          }
        }
      }
        if(this.datalist.length === 0){
          this.ShowAllSelect = false;
        }else{
          this.ShowAllSelect = true;
        }
      },
      AllSelect(param){
        for(let i = 0; i < this.checkList.length; i++){
          this.checkList[i] = param;
          let data1 = this.datalist[i].index;
          let data2 = this.AllDataList[data1];
          data2.isSelect = param;
        }
      },
      SingleSelect(param){
        if(param === false){
          this.checked = false;
        }else{
          for(let i = 0; i < this.checkList.length; i++){
            console.log(this.checkList[i])
            if(this.checkList[i] === false){
              this.checked = false;
              this.datalist[i].isSelect = false;
              break;
            }else{
              this.checked = true;
            }
          }
        }
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
  height: 120px;
  width: 90px;
}
ul li{
  height: 140px;
}
.filmName{
  font-size: 20px;
  font-weight: 500;
}
.ShoppingCarTitle{
  text-align: center;
  color: #409eff;
}
.ShoppingDiv{
  display: flex;
  justify-content: center;
  padding-bottom: 45px;
}
.ShoppingCarContainer{
  position: relative;
  width: 100%;
}
.shoppingCarSingal {
  height: 140px !important;
  width: 100%;
}
.inputNum{
  display: block;
  margin-left: 180px;
  margin-top: -46px;
}
.TotalCount{
  position: fixed;
  bottom: 60px;
  z-index: 999;
  width: 100%;
  height: 50px;
  background-color: #409EFF;
}
.AllSelect{
  margin-left: 20px;
  margin-top: 15px;
}
.CountPrice{
  float: right;
  line-height: 50px;
}
</style>
