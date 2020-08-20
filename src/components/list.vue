<template>
  <van-list
    v-model="loading"
    class="wrap-list"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :finished="finished"
    :finished-text="finishedText"
    @load="fetchDataLocal"
  >
    <template v-if="list.length > 0 || loading">
      <div class="wrap-item" v-for="item in list" :key="item.orderId || item.billId">
        <slot name="default" :item="item"></slot>
      </div>
    </template>
    <template v-else>
      <slot name="empty"></slot>
    </template>
  </van-list>
</template>
<script>
import { List } from "vant";

export default {
  name: "cmb-list",
  components: {
    [List.name]: List,
  },
  props: ["api", "param"],
  data() {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      finishedText: "没有啦~",
      page: 0,
      size: 10,
    };
  },
  watch: {
    param() {
      this.page = 0;
      this.list = [];
      this.finished = false;
      this.loading = false;
      // this.fetchData();
      this.fetchDataLocal();
    },
  },
  methods: {
    fetchDataLocal: function () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 60) {
          this.finished = true;
        }

        if (this.$slots.empty && this.list.length == 0 && this.finished) {
          this.finishedText = "";
        }
      }, 500);
    },
    fetchData: function () {
      this.ajax
        .$get(this.api, {
          ...this.param,
          page: ++this.page,
          size: this.size,
        })
        .then(
          (res) => {
            // this.$spliceData({ 'listData': [0, 0, ...[0, 1, 2, 3]] });
            if (this.page == 1) {
              this.list = res.data.resultList;
            } else {
              this.list = this.list.concat(res.data.resultList);
            }
            this.loading = false;
            if (res.data.resultCount < this.size) {
              this.finished = true;
            }
            if (this.$slots.empty && this.list.length == 0 && this.finished) {
              this.finishedText = "";
            } else {
              this.finishedText = "没有啦~";
            }
          },
          () => {}
        );
    },
  },
};
</script>