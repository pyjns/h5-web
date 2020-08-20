<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  computed: {},
};
</script>

<style lang="less">
#app {
  font-family: "PingFangSC-Regular", "PingFangSC", "PingFang SC",
    "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
