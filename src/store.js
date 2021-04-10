import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {HIDE_TABBAR_MUTATION,SHOW_TABBAR_MUTATION,LOGED,UNLOG} from '../type/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    // 自定义的共享状态存放于此
    isTabbarShow:true,
    comingList:[],
    nowplayList:[],
    islog:false,
    ShoppingList:[],
    ShoppingSelect:[],
    AllUserInfo:[]
  },
  getters:{
    comingListGetter(state){
      return state.comingList.filter((item,index) => index<3 )
    }
  },
  mutations: {
    // 这是唯一修改状态的位置
    // HideMaiZuoTabbar
    [HIDE_TABBAR_MUTATION](state,data){
      state.isTabbarShow = data
    },
    // ShowMaiZuoTabbar
    [SHOW_TABBAR_MUTATION](state,data){
      state.isTabbarShow = data
    },
    // LOG
    [LOGED](state,data){
      state.islog = data
    },
    // UNLOG 
    [UNLOG](state,data){
      state.islog = data
    },
    // comingsoon接口拉过来的数据通过这个方法给comingList
    comingListMutation(state,data){
      state.comingList = data
    },
    // 购物车添加
    ShoppingListAdd(state,data){
      // 原购物车内容
      let SLobj = state.ShoppingList
      // 添加的内容
      let Addobj = {
        CinemaName:data.name,
        TicketCount:data.count,
        TicketPrice:data.price,
        Id:null
      }
      let AddNew = true
      // 判断购物车是否为空
      if(SLobj.length === 0){
        console.log("购物车为空，增加该商品")
        Addobj.Id = 0
        state.ShoppingList.push(Addobj)
      }else{
        // 判断是否是重复添加
        for(let i = 0; i < SLobj.length; i++){
          // 存在该商品就只增加数量
          // console.log('adobjName',Addobj.CinemaName)
          // console.log('SLobjName',SLobj[i].CinemaName)
          if(Addobj.CinemaName === SLobj[i].CinemaName){
            state.ShoppingList[i].TicketCount++
            // i = SLobj.length
            console.log("商品已存在购物车内，数量+1")
            // 关闭添加通道，因为添加通道默认开启
            AddNew = false;
          }
        }
        if(AddNew){
            // 新商品添加至购物车
            Addobj.Id = SLobj.length
            state.ShoppingList.push(Addobj)
            console.log("商品不存在购物车内，添加商品")
            // 关闭通道
            this.AddNew = false;
        }
      }
    },
    // 记住用户购物车数据
    UploadSelect(state,data){
      state.ShoppingSelect = data
    },
    // 购物车数量删除
    ShoppingListDel(state,data){
       // 原购物车内容
       let SLobj = state.ShoppingList
       // 要减少数量的内容
       let Addobj = {
         CinemaName:data.name,
         TicketCount:data.count,
       }
      //  对购物车遍历寻找指定删除的内容
       for(let i = 0; i < SLobj.length; i++){
        if(Addobj.CinemaName === SLobj[i].CinemaName){
          state.ShoppingList[i].TicketCount--
          // i = SLobj.length
          console.log("数量",state.ShoppingList[i].TicketCount)
          console.log("商品数量-1")
        }
      }
    },
    // 初始化获取LoalStorage内的账号数据
    GetUserInfo(state,data){
      let LocalInfo = []
      for(let i = 0; i < data.length; i = i + 2){
        let SingleInfo = {
          UserAccount:data[i],
          UserPassword:data[i+1]
        }
        LocalInfo.push(SingleInfo)
      }
      state.AllUserInfo = LocalInfo
    },
    // 上传用户创建的账号到AllUserInfo
    UpLoadAccount(state,data){
      state.AllUserInfo.push(data)
    }
  },
  actions: {
      // 这里做异步处理
      getComingListAction(store){
        axios({
          url:"https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=6283675",
          headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160085152071987946848257","bc":"110100"}',
            'X-Host': 'mall.film-ticket.film.list'
          }
        }).then(res=>{
          // console.log(res.data.data.films);
          store.commit("comingListMutation",res.data.data.films);
        })
      },

  //     不标准的异步函数
  //     getCurrentCityName(){
  //       return new Promise(function (resolve, reject) {
  //         let myCity = new BMap.LocalCity()
  //         myCity.get(function (res) {
  //           resolve(res)
  //         })
  //       }).catch((err) => {
  //         reject(err)
  //         })
  //     }
  // }
  
  // 标准的异步函数
      async getCurrentCityName(){
        try {
          return new Promise(function (resolve, reject) {
            let myCity = new BMap.LocalCity()
            myCity.get(function (res) {
              resolve(res)
            })
          })
        } catch (err) {
          reject(err)
        }
      }
  }

})
