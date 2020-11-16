<template>
  <div
    class="wrap-swiper"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    @touchcancel="touchEnd"
  >
    <div
      class="wrap-list"
      :style="{
        width: ulWith + 'px',
        transitionDuration: transitionDuration,
        transform: translateX,
      }"
    >
      <div
        class="wrap-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{
          transform:
            index === swiperCurrent
              ? currentScale
              : index === stepNext || index === stepPrevious
              ? nextScale
              : 'scaleY(0.8)',
          transitionDuration: transitionDuration,
        }"
      >
        <slot name="default" :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { AccAdd, AccMul } from "../utils/calculate.js";

export default {
  name: "component_swiper",
  props: ["list"],
  data() {
    return {
      translateX: "translateX(0px)",
      transitionDuration: "0ms",
      scaleY: "scaleY(0.8)",
      swiperCurrent: 0,
      stepPrevious: -1,
      stepNext: 1,
      htmlFontSize: 0,
      liWith: 0,
      ulWith: 0,
      direction: "",
      pace: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      minOffset: 0,
      currentScaleNum: 1,
      nextScaleNum: 0.8,
      currentScale: "scaleY(1)",
      nextScale: "scaleY(0.8)",
    };
  },
  watch: {
    list: function () {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var fontSize = document.documentElement.clientWidth / 10;
      var liWith = Math.floor(AccMul(9.2, fontSize));

      this.liLength = this.list.length;
      this.htmlFontSize = fontSize;
      this.liWith = liWith;
      this.minOffset = Math.floor(AccAdd(AccMul(0.186, fontSize), liWith));

      this.resizeUlWith();
    },
    resizeUlWith: function resizeUlWith() {
      //      var ulWith = AccAdd(
      //   AccMul(this.liWith, this.liLength),
      //   AccMul(AccMul(0.16, this.htmlFontSize), this.liLength-1)
      // );
      var ulWith = AccAdd(
        AccMul(this.liWith, this.liLength),
        AccMul(AccMul(0.186, this.htmlFontSize), this.liLength)
      );
      this.ulWith = ulWith;
    },
    delta: function delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    getDirection: function getDirection(x, y) {
      var MIN_DISTANCE = 10;
      if (x > y && x > MIN_DISTANCE) {
        return "horizontal";
      }

      if (y > x && y > MIN_DISTANCE) {
        return "vertical";
      }

      return "";
    },
    isCorrectDirection: function isCorrectDirection() {
      if (
        (this.swiperCurrent == this.liLength - 1 && this.pace > 0) ||
        (this.swiperCurrent == 0 && this.pace < 0) ||
        this.liLength < 2 ||
        this.direction == "vertical"
      ) {
        return false;
      } else {
        return true;
      }
    },
    resetTouchStatus: function resetTouchStatus() {
      this.direction = "";
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.transitionDuration = "0ms";
    },
    touchStart: function touchStart(event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove: function touchMove(event) {
      var touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction =
        this.direction || this.getDirection(this.offsetX, this.offsetY);
      this.pace = this.offsetX > 0 ? (this.deltaX > 0 ? -1 : 1) : 0;

      if (this.isCorrectDirection()) {
        var offset = AccMul(
          -this.pace,
          this.range(this.offsetX, 0, this.minOffset)
        );

        var scaleNum = (Math.abs(offset) / this.liWith) * 0.2;

        this.currentScaleNum = Math.max(1 - scaleNum, 0.8);
        this.nextScaleNum = Math.min(AccAdd(0.8, scaleNum), 1);

        this.move({
          offset: offset,
          step: 0,
        });
      }
    },
    touchEnd: function touchEnd(event) {
      if (this.isCorrectDirection() && this.offsetX > 0) {
        var minOffsetNum = -AccMul(this.pace, this.minOffset);

        this.currentScaleNum = 1;
        this.nextScaleNum = 0.8;
        this.transitionDuration = "500ms";

        this.move({
          offset: minOffsetNum,
          step: this.pace,
        });

        this.swiperCurrent = this.range(
          this.swiperCurrent + this.pace,
          0,
          this.liLength - 1
        );

        if (this.pace > 0) {
          //像右
          this.stepNext = this.range(
            this.swiperCurrent + this.pace,
            0,
            this.liLength
          );
          this.stepPrevious = this.range(
            this.swiperCurrent - this.pace,
            -1,
            this.liLength - 2
          );
        } else {
          //像左
          this.stepNext = this.range(
            this.swiperCurrent + this.pace,
            -1,
            this.liLength - 2
          );
          this.stepPrevious = this.range(
            this.swiperCurrent - this.pace,
            0,
            this.liLength
          );
        }
      }
    },
    range: function range(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    move: function move(obj) {
      var targetOffset = AccAdd(
        obj.offset,
        -AccMul(this.minOffset, this.swiperCurrent)
      );
      this.currentScale = "scaleY(" + this.currentScaleNum + ")";
      this.nextScale = "scaleY(" + this.nextScaleNum + ")";
      this.translateX = "translateX(" + targetOffset + "px)";
    },
    getScale(index) {
      var str = "scaleY(0.8)";
      if (index === this.swiperCurrent) {
        str = this.currentScale;
      } else if (index === this.stepNext || index === this.stepPrevious) {
        str = this.nextScale;
      }
      return str;
    },
  },
};
</script>
<style lang="less" scoped>
.wrap-swiper {
  width: 100%;
  overflow: hidden;
}

.wrap-list {
  margin: 0 15px;
  width: 10000px;
}

.wrap-item {
  float: left;
  height: 200px;
  width: 345px;
  background: #fff;
  box-shadow: 0px 2.5px 5px 0px rgba(51, 51, 51, 0.1);
  box-sizing: border-box;
  padding: 5px 14px 0;
  border-radius: 6px;
}

.wrap-item + .wrap-item {
  margin-left: 6px;
}
</style>