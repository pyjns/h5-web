<template>
  <div>
    <h1>首页</h1>
    <router-link class="block" to="/back/order">去订购</router-link>
    <router-link class="block" to="/back/fast">快速订购</router-link>
    <router-link class="block" to="/back/list">清单列表</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
h1{
  text-align: center;
}
.block {
  display: block;
  height: 100px;
  line-height: 100px;
  border: solid 1px black;
  text-align: center;
  font-size: 18px;
}
</style>