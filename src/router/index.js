import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Search from '@/components/search'

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
      path:'/Search',
      component:Search
    }
  ]
})
