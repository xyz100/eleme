import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './router.js'

import './assets/css/index.less'

Vue.use(VueRouter)
Vue.prototype.$http = axios

const router = new VueRouter({
	routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
