<template>
  <div class="calendar-wrap">
    <div class="caption">
      <div class="time">{{curYearMonth}}</div>
      <div class="btns">
        <span class="item" @click="handleToggleMonth('prev')">
          <i class="prev"></i>
        </span>
        <span class="item" @click="handleToggleMonth('next')">
          <i class="next"></i>
        </span>
      </div>
    </div>
    <div class="container">
      <div class="week">
        <div class="item" v-for="(item, index) in _week" :key="index">{{item}}</div>
      </div>
      <ul class="data">
        <li class="item invalid" v-for="(item, index) in startDay" :key="index - startDay">
          <span class="text">{{prevMonthDays + 1 + index - startDay}}</span>
        </li>
        <li class="item" :class="{selected: selectDay == index + 1}" v-for="(item, index) in itineraryList" @click="seleceDay(index + 1)" :key="index">
          <span class="text" :class="{active: curDay == index + 1}">{{item.dateIndex}}
            <div class="points" v-if="item.itineraryLength > 0">
              <div class="status-point" style=" background-color:#67C23A" />
            </div>
          </span>

        </li>
        <li class="item invalid" v-for="(item, index) in endDay" :key="curMonthDays + index + 1">
          <span class="text">{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getShowData
  } from "../network/home";
  export default {
    name: 'Calendar',
    data() {
      return {
        itineraryList: [],
        selectDay: 1,
        prevMonthDays: 0,
        curMonthDays: 0,
        nextMonthDays: 0,
        curYearMonth: '',
        startDay: 0,
        endDay: 0,
        curDay: 0,
        curYear: 0,
        curMonth: 0,
        prevYear: 0,
        prevMonth: 0,
        nextYear: 0,
        nextMonth: 0,
        selectedData: {}
      };
    },
    computed: {
      _week() {
        let arr = [...'一二三四五六日'];
        arr.unshift(arr.pop())
        return arr;
      }
    },
    mounted() {
      let date = new Date();
      this.curDay = date.getDate();
      this.handleFormatDate(date.getFullYear(), date.getMonth() + 1);
      // console.log('传递数据：', this.itineraryList);
      this.initData();
    },
    methods: {
      initData() {
        getShowData().then(res => {
          // console.log(res.data);
          let temp = res.data.map(item => {
            return this.formData(item);
          })
          this.itineraryList = temp;
          // console.log(this.itineraryList);
        })
      },
      formData(item) {
        // console.log(item);
        item.dateIndex = parseInt(item.date.substring(8, 10));
        item.itineraryLength = item.itinerarys.length;
        // console.log(item.itinerarys.length);
        return item;
      },
      seleceDay(index) {
        // console.log(index);
        this.selectDay = index
        // console.log(this.itineraryList[index - 1]);
        this.$emit('itemSelected', this.itineraryList[index - 1])
      },
      handleFormatDate(year, month) {
        // console.log(month);
        if (month > 12) {
          ++year;
          month = 1;
        } else if (month < 1) {
          --year;
          month = 12;
        }

        this.curYear = year;
        this.curMonth = month;

        let prevDate = new Date(year, month);
        this.prevYear = prevDate.getFullYear();
        this.prevMonth = prevDate.getMonth() - 1;

        if (this.prevMonth === 0) {
          --this.prevYear;
          this.prevMonth = 12;
        } else if (this.prevMonth === -1) {
          --this.prevYear;
          this.prevMonth = 11;
        }

        let nextDate = new Date(year, month);
        this.nextYear = nextDate.getFullYear();
        this.nextMonth = nextDate.getMonth() + 1;

        // 输出年月
        this.curYearMonth = `${year}年${String(month).padStart(2, '0')}月`;
        // 获取上月总天数
        this.prevMonthDays = this.handleMonthDays(year, month - 1);
        // 获取当前月总天数
        this.curMonthDays = this.handleMonthDays(year, month);
        // console.log(this.curMonthDays);
        // 获取下月总天数
        this.nextMonthDays = this.handleMonthDays(year, month + 1);
        this.handleStartAndEndWeek(year, month, this.curMonthDays);
      },
      handleMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
      },
      handleStartAndEndWeek(year, month, monthDays) {
        this.startDay = new Date(year, month - 1, 0).getDay();
        // this.endDay = 7 - new Date(year, month, 0).getDay();
        this.endDay = 7 - (new Date(year, month, 0).getDay() + 1);
        if (++this.startDay === 7) {
          this.startDay = 0;
        }

        if (
          Math.ceil(monthDays / 7) < 6 &&
          Math.ceil((monthDays + this.startDay + this.endDay + 7) / 7) < 7
        ) {
          if (this.startDay === 0) {
            this.startDay += 7;
          } else {
            this.endDay += 7;
          }
        }
      },
      handleToggleMonth(str) {
        // console.log(str);
        let [year, month] = this.curYearMonth.match(/\d+/g);
        str === 'next' ? ++month : --month;
        this.handleFormatDate(year, month);
      }
    }
  };
</script>
<style lang="less" scoped>
  @color : #4352d7;
  @font-color: #4a4f58;
  @font-color-un: #b6c1d4;

  .calendar-wrap {
    font-size: 12px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 5px 11px #f1f1f1;

    .caption {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      color: @font-color;
      font-weight: bold;
      font-size: 14px;

      .btns {
        width: 50px;

        .item {
          float: left;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .prev,
        .next {
          width: 5px;
          height: 5px;
          border-top: 2px solid @font-color-un;
          border-left: 2px solid @font-color-un;
        }

        .prev {
          transform: rotate(-45deg);
        }

        .next {
          transform: rotate(135deg);
        }
      }


      .time {
        padding: 0 25px;
      }
    }

    .container {
      font-size: 14px;

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% / 7);
        height: 30px;
        margin-top: 4px;
      }

      ul {
        padding-inline-start: 0;
      }

      .week {
        display: flex;
        align-items: center;

        .item {
          color: @font-color;
          font-weight: bold;
        }
      }

      .data {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .item {

          .text {
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 30px;
            height: 30px;
            border-radius: 12px;
            color: @font-color;

            .points {
              width: 80%;
              display: flex;
              justify-content: space-around;
            }

            &.active {
              color: #fff;
              background: @color ;
            }
          }
        }

        .item.invalid {
          .text {
            color: @font-color-un;
          }

        }

        .item.selected {
          .text {
            background-color: @font-color-un;
          }

        }

        .status-point {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }
      }
    }
  }
</style>