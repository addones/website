// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('search-result',{
  props:['item'],
  template:'<div class="search-result" v-if="item"><div class="search-image left"><img :src="item.header" alt="" width="184" height="86"></div><div class="search-content left"><div class="search-content-left left"><h2 class="search-content-name">{{item.name}}</h2><span class="company">暴雪娱乐</span></div><div class="search-content-right right"><div class="search-sidebar-platform"><div class="icon iconfont aone-windows" :class="{support:item.windows}"></div><div class="icon iconfont aone-apple" :class="{support:item.mac}"></div><div class="icon iconfont aone-steam" :class="{support:item.linux}"></div></div><span class="issue-date">2017年1月1日发售</span></div></div><a href="" class="search-button-purchase-big left"><em class="iconfont aone-steam"></em><div class="particulars">详情</div><em class="iconfont aone-enter"></em></a></div>'
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})