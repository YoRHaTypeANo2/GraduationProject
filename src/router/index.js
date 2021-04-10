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
  mode:"history",
  routes: [
    {
      path: "/home",
      component:Home,
      name:"home",
    },
    {
      path: "/center",
      component:Center,
      name:"center"
    },
    {
      path: "/login",
      component:Login
    },
    {
      path: "/film",
      component: Film,
      children:[
        {
        path: "now-playing",
        component:NowPlaying
      },
      {
       path: "coming-soon",
        component:ComingSoon
      },
      {
       path:"/film",
        redirect:"/film/now-playing"
      }
    ]
    },
    {
      path: "/shoppingcar",
      component:ShoppingCar
    }, {
      path: "/city",
      component:City,
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
