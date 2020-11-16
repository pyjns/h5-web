<template>
  <div class="page">
    <van-cell-group class="basic-info">
      <van-cell
        @click="setInfo('height')"
        title="身高"
        is-link
        :value="height ? height + '厘米' : '请选择'"
      />
      <van-cell
        @click="setInfo('weight')"
        title="体重"
        is-link
        :value="weight ? weight + '公斤' : '请选择'"
      />
    </van-cell-group>

    <div @click="begin" class="btn">保存身高体重</div>

    <van-popup
      v-model="showRuler"
      position="bottom"
      round
      closeable
      close-icon="cross"
    >
      <ruler
        :sort="sort"
        :show="showRuler"
        :init-value="initValue"
        @submit="submit"
      ></ruler>
    </van-popup>
  </div>
</template>

<script>
import Ruler from "@/components/ruler.vue";
import { Popup, Toast, Cell, CellGroup } from "vant";

export default {
  name: "example-ruler",
  components: {
    Ruler,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      showRuler: false,
      height: 0,
      weight: 0,
      initValue: 0,
      sort: "",
    };
  },
  methods: {
    setInfo(sort) {
      this.sort = sort;
      this.initValue = Number(this[this.sort]);
      this.showRuler = true;
    },
    submit(param) {
      this[param.sort] = param.value;
      this.showRuler = false;
    },
    begin() {
      if (!this.height) {
        Toast("请设置身高！");
      } else if (!this.weight) {
        Toast("请设置体重！");
      } else {
        Toast(`身高：${this.height};体重：${this.weight}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
}
.btn {
  margin-top: 100px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  height: 47px;
  line-height: 47px;
  text-align: center;
  background: #fff;
  border-radius: 47px;
  background-color: #fa8064;
  margin: 100px 28px 30px;
}
</style>