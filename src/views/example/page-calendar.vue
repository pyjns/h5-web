<template>
  <div class="page">
    <month
      :valid-dates="validDates"
      :inital-date="initalDate"
      @change-month="changeMonth"
      @select="selectDate"
    ></month>
  </div>
</template>

<script>
import Month from "@/components/calendar/Month.js";
import { GetRandom } from "@/utils/tools.js";
import { Toast } from "vant";

export default {
  name: "example-calendar",
  components: {
    Month,
    [Toast.name]: Toast,
  },
  data() {
    return {
      initalDate: "",
      validDates: [],
    };
  },
  mounted() {
    this.getValidCalendar(this.formatDateHyphen(new Date()));
  },
  methods: {
    formatDateHyphen(date) {
      if (typeof date == "string") {
        date = new Date(date);
      }

      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    getValidCalendar(dateStr) {
      let date = new Date(dateStr);

      this.validDates = [
        `${date.getFullYear()}/${date.getMonth() + 1}/${GetRandom(0, 10)}`,
        `${date.getFullYear()}/${date.getMonth() + 1}/${GetRandom(11, 20)}`,
        `${date.getFullYear()}/${date.getMonth() + 1}/${GetRandom(21, 28)}`,
      ];

      if (this.validDates.length) {
        this.initalDate = this.validDates[this.validDates.length - 1];
      } else {
        this.initalDate = "";
      }
      this.emitMethod();
    },
    changeMonth(date) {
      this.getValidCalendar(this.formatDateHyphen(date));
    },
    selectDate(date) {
      this.initalDate = date;
      this.emitMethod();
    },
    emitMethod() {
      Toast(`您选择了：${this.initalDate}`);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../components/calendar/style.less";
</style>