// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import iconfont from './assets/iconfont/iconfont.js'
import store from './store'
import All from '../module/moduleA'
import {A1,A2 as MyA12} from '../module/moduleB'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(elementUI);
Vue.use(Mint);
Vue.config.productionTip = false


console.log(All);
console.log(A1,MyA12);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h =>  h(App)
}).$mount('#box')
