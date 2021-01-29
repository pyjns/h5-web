<template>
  <div>
    <h1>清单</h1>
    <router-link class="block" to="/back/order" replace>去订购</router-link>
  </div>
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    console.log("to ", to);
    console.log("from ", from);
    console.log("router ", this.$router);
    if (to.path.indexOf("fast") > -1) {
      console.log("*****fast -1*****");
      this.$router.go(-1);
    } else if (to.path.indexOf("cart") > -1) {
      console.log("*****cart -2*****");
      this.$router.go(-2);
    } else {
      console.log("*****next*****");
      next();
    }
  },
};
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