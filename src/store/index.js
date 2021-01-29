import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let modules = {};

const files = require.context("./modules", true, /\.js$/);

files.keys().forEach(key => {
  let name = key.match(/([A-Za-z0-9-_]+)\./i)[1]
  modules[name] = files(key).default(Vue);
})

export default new Vuex.Store({
  modules
});