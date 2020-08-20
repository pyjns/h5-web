import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible.js'
import Request from './utils/request';


Vue.config.productionTip = false

Vue.prototype.ajax = Request;


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')