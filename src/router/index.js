import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Film from '@/views/film'
import ShoppingCar from '@/views/shoppingcar'
import ComingSoon from '@/views/comingsoon'
import NowPlaying from '@/views/nowplaying'
import Detail from '@/views/detail'
import Center from '@/views/center'
import Login from '@/views/login'
import CSDetial from '@/views/cs-detail'
import City from '@/views/city'

Vue.use(Router)
export default new Router({
  // mode:"history",
  routes: [
    {
      path: "/home",
      component: resovle =>require(['@/views/home'], resovle),
      name:"home"
    },
    {
      path: "/center",
      component: resovle =>require(['@/views/center'], resovle),
      name:"center"
    },
    {
      path: "/login",
      component: resovle =>require(['@/views/login'], resovle),
      name:"login"
    },
    {
      path: "/film",
      component: resovle =>require(['@/views/film'], resovle),
      children:[
        {
        path: "now-playing",
        component: resovle =>require(['@/views/nowplaying'], resovle),
      },
      {
       path: "coming-soon",
       component: resovle =>require(['@/views/comingsoon'], resovle),
      },
      {
       path:"/film",
        redirect:"/film/now-playing"
      }
    ]
    },
    {
      path: "/shoppingcar",
      component: resovle =>require(['@/views/shoppingcar'], resovle),
    }, {
      path: "/city",
      component: resovle =>require(['@/views/city'], resovle),
       name:'city'
    },
    {
      path: "/detail/:id",
      component:Detail,
      name:"mydetail"
    },
    {
      path:"/cs-detail/:id",
      component:CSDetial,
      name:"CSdetail"
    },
    {
     path:"/",
      redirect:{name:"home"}
    }
  ]
})
