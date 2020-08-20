<template>
  <div class="page-menu">
    <van-sticky>
      <van-dropdown-menu active-color="#F86E21">
        <van-dropdown-item v-model="type" :options="typeList" @change="changeParam" />
        <van-dropdown-item v-model="status" :options="statusList" @change="changeParam" />
      </van-dropdown-menu>
    </van-sticky>
  </div>
</template>
<script>
import { DropdownMenu, DropdownItem, Sticky } from "vant";
export default {
  name: "page-menu",
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      type: "",
      typeList: [
        {
          value: "",
          text: "消费分类",
        },
        {
          value: 1,
          text: "食品消费",
        },
        {
          value: 2,
          text: "日用品消费",
        },
        {
          value: 3,
          text: "药品消费",
        },
      ],
      status: "",
      statusList: [
        {
          value: "",
          text: "订单状态",
        },
        {
          value: 1,
          text: "退款中",
        },
        {
          value: 2,
          text: "已付款",
        },
        {
          value: 3,
          text: "已退款",
        },
        {
          value: 4,
          text: "待付款",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    changeParam() {
      this.$emit("changeParam", {
        type: this.type,
        status: this.status,
      });
    },
  },
};
</script>
<style lang="less">
.page-menu {
  .van-dropdown-menu__title--active {
    color: #323233 !important;
  }
}
</style>