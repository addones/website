import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Search from '@/components/search'
import appInfo from '@/components/appInfo'

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
      name:'appInfo',
      path:'/appInfo/:appid',
      component:appInfo
    }
  ]
})
