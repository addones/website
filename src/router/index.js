import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Search from '@/components/search'
import app from '@/components/app'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '',
      component:Index,
      //redirect:'/Home'
    },
    {
      path:'/Home',
      component:Home
    },
    {
      name:'Search',
      path:'/Search',
      component:Search
    },
    {
      name:'app',
      path:'/app/:appid',
      component:app
    }
  ],
  scrollBehavior(to,from,savedPosition){
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
