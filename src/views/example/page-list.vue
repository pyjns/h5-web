<template>
  <div class="page">
    <Menu @changeParam="changeParam"></Menu>
    <list :api="api" :param="param">
      <template v-slot:default="{item}">
        <div class="item">{{item}}</div>
      </template>
      <template v-slot:empty>
        <Empty></Empty>
      </template>
    </list>
  </div>
</template>

<script>
import Menu from "@/components/menu.vue";
import List from "@/components/list.vue";
import Empty from "@/components/empty.vue";

export default {
  name: "page-list",
  components: { Menu, List, Empty },
  props: ["query"],
  data() {
    return {
      api: "/page/list/data",
      param: {
        type: "",
        status: "",
      },
    };
  },
  methods: {
    changeParam(param) {
      this.param = param;
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  background: rgba(246, 242, 239, 1);
  min-height: 100vh;
  font-size: 14px;
}
/deep/ .wrap-list {
  .wrap-item {
    .item {
      text-align: center;
      height: 100px;
      line-height: 100px;
      border: solid 1px #ccc;
    }
  }
}
</style>