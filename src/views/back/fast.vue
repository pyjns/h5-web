<template>
  <div>
    <h1>快速</h1>
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