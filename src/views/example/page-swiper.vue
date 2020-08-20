<template>
  <div class="page">
    <swiper :list="list">
      <template v-slot:default="{item}">
        <div class="item">{{item}}</div>
      </template>
    </swiper>
  </div>
</template>

<script>
import Swiper from "@/components/swiper.vue";

export default {
  name: "page-swiper",
  components: {
    Swiper,
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
    };
  },
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  padding-top: 30px;
}

/deep/ .wrap-item {
  background: yellowgreen;
  .item {
    width: 100%;
    height: 100%;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
}
</style>