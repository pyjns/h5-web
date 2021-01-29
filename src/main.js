import Vue from 'vue'
import App from './App.vue'
import store from "./store/index.js";
import router from "./router/index.js";
import 'lib-flexible/flexible.js'
import Request from './utils/request';


Vue.config.productionTip = false

Vue.prototype.ajax = Request;


new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('example/initExample');
  },
}).$mount('#app')