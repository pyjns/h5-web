import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

let routes = [
  { path: '/example/page-list', name: "page-list", meta: { title: "列表" }, component: () => import(/* webpackChunkName: "example" */`./views/example/page-list.vue`) },
  { path: '/example/page-swiper', name: "page-swiper", meta: { title: "滑块" }, component: () => import(/* webpackChunkName: "example" */`./views/example/page-swiper.vue`) },
  { path: '/example/page-article', name: "page-article", meta: { title: "文章" }, component: () => import(/* webpackChunkName: "example" */`./views/example/page-article.vue`) },
];

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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





// const files = require.context("./views", true, /[A-Za-z0-9-_,\s]+\.vue$/i);

// files.keys().forEach(key => {
//   // const matched = key.match(/([A-Za-z0-9-_]+)\./i);
//   const path = key.match(/\.(\/([A-Za-z0-9-_].+)\.vue)/i);
//   // console.log(path);
//   // 排除掉路径中有component的 
//   if (path && path.length > 1) {
//     console.log(path[1]);
//     let param = {
//       path: `/${path[2]}`,
//       // name: path[2],
//       meta: { keepAlive: false },
//       name: path[2].replace("/", '-'),

//       component: () => import(`./views${path[1]}`),
//       props: (route) => {
//         const { query } = route;
//         return { query };
//       }
//     }
//     if (path[2] == "boc/list") {
//       param.meta.keepAlive = true

//     }
//     routes.push(param)
//   }
// })

/**
 const path = require('path');
const glob = require('glob');

exports.getEntry = function (fileName){
  var globPath = `./src/htmls/template/${fileName ? fileName : '*'}.html`,
    entries = {},
    basename;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    entries[basename] = {
      // page 的入口
      entry: `src/htmls/main/${basename}.js`,
      // 模板来源
      template: `src/htmls/template/${basename}.html`,              //'src/htmls/template/index.html',
      // 在 dist/index.html 的输出
      filename: path.basename(entry),  //'index.html'
    };
  });
  return entries;
};


 */
