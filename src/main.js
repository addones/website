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
  template:'<div class="search-result" v-if="item"><div class="search-sidebar-platform left"><div class="icon iconfont aone-windows" :class="{support:item.windows}"></div><div class="icon iconfont aone-apple" :class="{support:item.mac}"></div><div class="icon iconfont aone-steam" :class="{support:item.linux}"></div></div><div class="search-image left"><img :src="item.header" alt="" width="276" height="129"></div><div class="search-content left"><h2>{{item.name}}</h2><div class="search-content-bottom"><div class="info-basic"><span class="company">暴雪娱乐</span><ul><li>RPG</li><li>18+</li></ul><span class="issue-date">2017年1月1日发售</span></div><div class="info-index"><div class="num-tag highlight">+1推荐指数：8.5/10</div><div class="num-tag">在线人数：30000</div><div class="num-tag">点评总数：<a href="#">30000</a></div></div></div></div><a href="" class="search-button-purchase-big left"><div class="orig">￥249</div><div class="final"><span class="pct">-30%</span>￥174</div><div class="title">到STEAM商店购买</div></a></div>'
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})