// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import search_result from '@/components/common/search-result'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component(search_result.name,search_result)





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})