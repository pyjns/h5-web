<template>
  <div class="wrap">
    <div class="title">{{ this[sort].title }}</div>
    <div class="value-wrap">
      <span class="value">{{ this[sort].value }}</span>
      <span class="unit">{{ this[sort].unit }}</span>
    </div>
    <div class="mark"></div>
    <div class="ruler-wrap">
      <div
        id="ruler"
        class="ruler"
        @touchstart.capture="touchStart"
        @touchmove.capture="touchMove"
        @touchend.capture="touchEnd"
        @touchcancel.capture="touchEnd"
        :style="styleObj"
      ></div>
      <div class="scale-wrap" :style="styleObj">
        <span
          class="scale"
          v-for="(item, index) in this[sort].list"
          :key="sort + index"
        >
          <em>{{ item }}</em>
        </span>
      </div>
    </div>

    <div @click="submit" class="btn">确定</div>
  </div>
</template>

<script>
import { AccAdd, AccSub, AccMul, AccDiv } from "../utils/calculate.js";

export default {
  name: "Ruler",
  props: {
    sort: {
      type: String,
      default: "height",
    },
    initValue: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fontSize: 0,
      clientWidth: 0,
      translateX: 0,
      scaleOnePx: 0,
      position: {
        translateBase: 0,
        startX: 0,
        startY: 0,
        deltaX: 0,
        deltaY: 0,
        offsetX: 0,
        offsetY: 0,
        pace: 0,
      },
      height: {
        title: "身高",
        value: 160,
        start: 160,
        min: 100,
        max: 230,
        step: 1,
        stepOnePx: 0,
        maxTranslateX: 0,
        unit: "厘米",
        list: [
          ,
          100,
          110,
          120,
          130,
          140,
          150,
          160,
          170,
          180,
          190,
          200,
          210,
          220,
          230,
        ],
      },
      weight: {
        title: "体重",
        value: 50,
        start: 50,
        min: 25,
        max: 100,
        stepOnePx: 0,
        maxTranslateX: 0,
        step: 0.1,
        unit: "公斤",
        list: [
          ,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          64,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
        ],
      },
    };
  },
  computed: {
    styleObj() {
      return {
        "transition-duration": "0ms",
        transform: "translateX(" + this.translateX + "px)",
      };
    },
  },
  mounted() {
    this.clientWidth = document.documentElement.clientWidth;
    this.fontSize = this.clientWidth / 10;
    this.scaleOnePx = AccMul(AccDiv(11.1, 375), this.clientWidth);
    this.height.stepOnePx = this.scaleOnePx;
    this.weight.stepOnePx = AccMul(this.scaleOnePx, 10);

    this.init();
  },
  watch: {
    show: function (isShow) {
      isShow && this.init();
    },
  },
  methods: {
    init() {
      if (this.withinRange(this.initValue)) {
        this[this.sort].value = this.initValue;

        this.translateX = -AccMul(
          this[this.sort].stepOnePx,
          AccSub(this.initValue, this[this.sort].min)
        );
      } else {
        this.translateX = -AccMul(
          this[this.sort].stepOnePx,
          AccSub(this[this.sort].value, this[this.sort].min)
        );
      }

      this.position.translateBase = this.translateX;

      this[this.sort].maxTranslateX = AccMul(
        this[this.sort].stepOnePx,
        this[this.sort].max - this[this.sort].min
      );
    },
    submit() {
      this.$emit("submit", { sort: this.sort, value: this[this.sort].value });
    },
    withinRange(num) {
      return num >= this[this.sort].min && num <= this[this.sort].max;
    },
    touchStart(event) {
      this.position.startX = event.touches[0].clientX;
      this.position.startY = event.touches[0].clientY;
    },
    touchMove(event) {
      let touch = event.touches[0];
      this.position.deltaX = touch.clientX - this.position.startX;
      this.position.deltaY = touch.clientY - this.position.startY;

      this.position.offsetX = Math.abs(this.position.deltaX);
      this.position.offsetY = Math.abs(this.position.deltaY);

      this.position.pace =
        this.position.offsetX > 0 ? (this.position.deltaX > 0 ? -1 : 1) : 0;

      let translateXOffest = AccAdd(
        this.position.translateBase,
        this.position.deltaX
      );

      if (this.position.pace > 0) {
        translateXOffest = AccMul(
          -this.position.pace,
          Math.min(this[this.sort].maxTranslateX, -translateXOffest)
        );
      } else {
        translateXOffest = AccMul(
          this.position.pace,
          Math.max(0, -translateXOffest)
        );
      }

      this.translateX = translateXOffest;

      this[this.sort].value =
        this[this.sort].min +
        AccMul(
          Math.round(AccDiv(Math.abs(translateXOffest), this.scaleOnePx)),
          this[this.sort].step
        );
      event.preventDefault();
    },
    touchEnd(event) {
      let lastTranslateX = -AccMul(
        this[this.sort].stepOnePx,
        AccSub(this[this.sort].value, this[this.sort].min)
      );

      this.translateX = lastTranslateX;
      this.position.translateBase = this.translateX;
    },
    range: function range(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  .title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    font-weight: 500;
    color: #000;
  }

  .value-wrap {
    height: 50px;
    line-height: 50px;
    margin-bottom: 20px;
    color: #fc941c;
    text-align: center;
    .value {
      font-size: 45px;
      font-weight: bolder;
    }
    .unit {
      font-size: 16px;
    }
  }

  .mark {
    position: absolute;
    z-index: 30001;
    width: 16px;
    height: 35px;
    top: 130px;
    left: 50%;
    margin-left: -8px;
    background: url("../assets/icon/mark.png") left top / 16px 35px no-repeat;
  }
}
.ruler-wrap {
  position: relative;
  background: #f4f3f3;
  width: 100vw;
  overflow: hidden;
  .ruler {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3000;
    margin-left: -34px;
    width: 10000px;
    height: 80px;
    background: transparent url("../assets/icon/ruler.png") left top / 111px
      32px repeat-x;
  }
}

.scale-wrap {
  margin-left: -34px;
  width: 10000px;
  height: 80px;
  .scale {
    padding-top: 50px;
    // border: solid 1px red;
    display: inline-block;
    font-size: 16px;
    color: #bbb4ad;
    font-weight: 500;
    text-align: right;
    width: 111px;
    em {
      display: inline-block;
      font-style: normal;
      width: 30px;
      text-align: center;
      margin-right: -15px;
    }
  }
}

.btn {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  height: 47px;
  line-height: 47px;
  text-align: center;
  background: linear-gradient(
    162deg,
    rgb(241, 174, 2) 0%,
    rgba(245, 155, 57, 1) 100%
  );
  box-shadow: 0px 2px 8px 0px rgba(245, 159, 60, 0.5);
  border-radius: 47px;
  color: rgba(255, 255, 255, 1);
  margin: 32px 16px 28px;
}
</style>

