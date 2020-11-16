import { Icon } from "vant";

export default {
  components: {
    [Icon.name]: Icon,
  },
  props: {
    validDates: {
      type: Array,
      default: [],
    },
    initalDate: {
      type: String,
      default: "",
    }
  },
  data() {
    let nowDate = new Date();
    return {
      date: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1),
      firstDayOfWeek: 1,
      currentDate: null
    };
  },
  computed: {
    // currentDate() {
    //   return new Date(this.initalDate);
    // },
    subTitle() {
      return this.formatMonthTitle(this.date);
    },
    totalDay() {
      return this.getMonthDays(
        this.date.getFullYear(),
        this.date.getMonth() + 1
      );
    },
    days() {
      const days = [];
      const year = this.date.getFullYear();
      const month = this.date.getMonth();

      for (let day = 1; day <= this.totalDay; day++) {
        const date = new Date(year, month, day);
        const type = this.getDayType(date);

        let config = {
          date,
          type,
          text: day,
        };
        days.push(config);
      }

      return days;
    },
    offset() {
      const realDay = this.date.getDay();
      if (!this.firstDayOfWeek) {
        return realDay;
      }
      return (realDay + 7 - this.firstDayOfWeek) % 7;
    },
  },
  watch: {
    initalDate: function () {
      this.currentDate = new Date(this.initalDate);
    }
  },
  methods: {
    formatMonthTitle(date) {
      return `${date.getFullYear()}年${date.getMonth() + 1}月`;
    },
    formatDateSlash(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    getMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    compareDate(dateOne, dateTwo) {
      const year1 = dateOne.getFullYear();
      const month1 = dateOne.getMonth();
      const date1 = dateOne.getDate();

      const year2 = dateTwo.getFullYear();
      const month2 = dateTwo.getMonth();
      const date2 = dateTwo.getDate();

      if (year1 == year2 && month1 == month2 && date1 == date2) {
        return 0;
      } else if (dateOne.getTime() > dateTwo.getTime()) {
        return 1;
      } else {
        return -1;
      }
    },
    genHeaderTitle() {
      return <div class={'tiny-calendar__header-title'}>
        <span onClick={this.changeLastMonth}>
          <van-icon name="arrow-left" />
        </span>
        <span>{this.subTitle}</span>
        <span onClick={this.changeNextMonth}>
          <van-icon name="arrow" />
        </span>
      </div>;
    },
    genWeekDays() {
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const renderWeekDays = [
        ...weekdays.slice(this.firstDayOfWeek, 7),
        ...weekdays.slice(0, this.firstDayOfWeek),
      ];
      return (
        <div class={'tiny-calendar__weekdays'}>
          {renderWeekDays.map((item) => (
            <span class={'tiny-calendar__weekday'}>{item}</span>
          ))}
        </div>
      );
    },
    getDayType(day) {
      if (this.validDates.indexOf(this.formatDateSlash(day)) == -1) {
        return 'disabled';
      } else if (this.compareDate(day, this.currentDate) === 0) {
        return "selected";
      } else {
        return "";
      }
    },
    getDayStyle(index) {
      if (index === 0) {
        return { marginLeft: `${(100 * this.offset) / 7}%` };
      }
    },
    genDay(item, index) {
      const type = item.type;
      const disabled = type === "disabled";
      let classArray = ["tiny-calendar__day", disabled ? 'tiny-calendar__day--disabled' : ''];
      const style = this.getDayStyle(index);

      const onClick = () => {
        if (!disabled) {
          this.select(item)
        }
      };

      return (
        <div
          ref="day"
          style={style}
          class={classArray}
          onClick={onClick}
        >
          <div
            class={type === "selected" ? "tiny-calendar__selected-day" : ""}
          >
            {item.text}
          </div>
        </div>
      );
    },
    genDays() {
      return (
        <div ref="days" role="grid" class={"tiny-calendar__days"}>
          {this.days.map(this.genDay)}
        </div>
      );
    },
    changeLastMonth() {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      this.$emit('change-month', this.formatDateSlash(this.date));
    },
    changeNextMonth() {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      this.$emit('change-month', this.formatDateSlash(this.date));
    },
    select(item) {
      if (this.readonly) {
        return
      }
      this.currentDate = new Date(item.date)
      this.$emit('select', this.formatDateSlash(item.date));
    },
  },
  render() {
    return (
      <div class={"tiny-calendar"}>
        <div class={"tiny-calendar__header"}>
          {this.genHeaderTitle()}
          {this.genWeekDays()}
        </div>
        <div class={"tiny-calendar__body"}>
          <div class={"tiny-calendar__month"} ref="month">
            {this.genDays()}
          </div>
        </div>
      </div>
    );
  },
};

