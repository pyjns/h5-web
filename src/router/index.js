import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

let routes = [];

const files = require.context("./routes", true, /\.js$/);

files.keys().forEach(key => {
  routes.push(...files(key).default);
})

let router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_PORT ? `/k12-h5-web/${process.env.VUE_APP_PORT}` : "/",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;