import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import indexImg from '@/components/indexImg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexImg',
      component: indexImg
    }
  ]
})
