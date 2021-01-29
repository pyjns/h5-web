export default [
  { path: '/back/index', name: "index", meta: { title: "首页" }, component: () => import(/* webpackChunkName: "back" */`@/views/back/index.vue`) },
  { path: '/back/order', name: "order", meta: { title: "订购" }, component: () => import(/* webpackChunkName: "back" */`@/views/back/order.vue`) },
  { path: '/back/cart', name: "cart", meta: { title: "购物车" }, component: () => import(/* webpackChunkName: "back" */`@/views/back/cart.vue`) },
  { path: '/back/list', name: "list", meta: { title: "清单" }, component: () => import(/* webpackChunkName: "back" */`@/views/back/list.vue`) },
  { path: '/back/fast', name: "fast", meta: { title: "快速订购" }, component: () => import(/* webpackChunkName: "back" */`@/views/back/fast.vue`) },
];