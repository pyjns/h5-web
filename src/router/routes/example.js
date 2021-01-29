export default [
  { path: '/example/page-list', name: "page-list", meta: { title: "列表" }, component: () => import(/* webpackChunkName: "example" */`@/views/example/page-list.vue`) },
  { path: '/example/page-swiper', name: "page-swiper", meta: { title: "滑块" }, component: () => import(/* webpackChunkName: "example" */`@/views/example/page-swiper.vue`) },
  { path: '/example/page-article', name: "page-article", meta: { title: "文章" }, component: () => import(/* webpackChunkName: "example" */`@/views/example/page-article.vue`) },
  { path: '/example/page-ruler', name: "page-article", meta: { title: "尺子" }, component: () => import(/* webpackChunkName: "example" */`@/views/example/page-ruler.vue`) },
  { path: '/example/page-calendar', name: "page-calendar", meta: { title: "日历" }, component: () => import(/* webpackChunkName: "example" */`@/views/example/page-calendar.vue`) },
];