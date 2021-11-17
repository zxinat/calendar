<template>
  <div class="Home">
    <div class="content">
      <div class="left">
        <Calendar @itemSelected="cpnclick" />
        <div class="type-list">
          <template v-for="item in typeList">
            <li :key="item.type_id" @click="updateType(item)">
              <div class="status-point" :style="{backgroundColor:item.color}"></div>
              <span>{{item.type_name}}</span>
            </li>
          </template>
        </div>
        <!-- <img src="../../public/logo.webp" width="100px" style="margin-top:20px"> -->
      </div>
      <div class="right">
        <div class="row">
          <div class="bar">
            <div class="date-title">
              {{selectedData}}
            </div>
            <div class="btns">
              <el-button v-show="!listShow" type="primary" icon="el-icon-date" @click="listShow = true"></el-button>
              <el-button v-show="listShow" type="primary" icon="el-icon-tickets" @click="listShow = false"></el-button>
            </div>
          </div>
          <el-button type="primary"><i class="el-icon-plus el-icon--left" @click="addDialogVisible = true"></i>Add</el-button>
        </div>
        <div class="data-table" v-show="!listShow">
          <div class="table-head">
            <div class="table-head-item" v-for="item in selectedWeek" :key="item.date">
              <div>
                <div class="font-b">{{item.day}}</div>
                <div class="font-s">{{item.weekDay}}</div>
              </div>
            </div>
          </div>
          <div style="width:100%; height:500px; overflow-y: scroll; overflow-x: hidden;">
            <div class="iti-table">
              <div class="left-side">
                <template v-for="item in 24">
                  <div class="hour" :key="item">
                    {{item}}:00
                  </div>
                </template>
              </div>
              <div class="inner-box">
                <div class="week-events-view">
                  <div class="day-cols">
                    <div class="day-col-day" v-for="item in selectedWeek" :key="item.date">
                      <div class="day-col-hour">
                        <div class="day-col-content" v-if="item.itinerarys.length">
                          <div :style="classObject(item3)" v-for="item3 in item.itinerarys" :key="item3.itinerary_id">
                            {{item3.des}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="hour-lines">
                  <div class="day-cols">
                    <div class="day-col-day" v-for="item in 7" :key="item.date">
                      <div class="day-col-hour" v-for="item2 in 24" :key="item2">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div class="data-list">
          <el-table :data="weekList" style="width: 100%">
            <el-table-column width="50">
              <template slot-scope="scope">
                <div class="status-point" :style="{backgroundColor:scope.row.color}"></div>
              </template>
            </el-table-column>
            <el-table-column prop="des" label="内容" width="180">
            </el-table-column>
            <el-table-column prop="start" label="开始时间">
            </el-table-column>
            <el-table-column prop="end" label="结束时间">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <el-dialog title="提示" :visible.sync="addDialogVisible" width="40%">
        <el-form ref="form" :model="form" label-width="80px" label-position="right">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动类型">
            <el-select v-model="form.type_id" placeholder="请选择活动类型" style="width: 100%;">
              <el-option v-for="item in typeList" :key="item.type_id" :label="item.type_name" :value="item.type_id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="类型编辑" :visible.sync="typeDialogVisible" width="50%">
        <el-form ref="typeform" :model="typeform" label-width="80px" label-position="right">
          <el-form-item label="类型名称">
            <el-input v-model="typeform.name"></el-input>
          </el-form-item>
          <el-form-item label="类型颜色">
            <Chrome v-model="typeform.color" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="typeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitType">确 定</el-button>
        </span>
      </el-dialog>

    </div>

  </div>
</template>

<script>
  import {
    Chrome
  } from 'vue-color'
  import Calendar from '../components/Calendar.vue'

  import {
    getShowData,
    getAllTypes,
    addItinerary,
    getWeekList
  } from "../network/home";
  import * as util from "../util/util";
  export default {
    name: '',
    components: {
      Calendar,
      Chrome
    },
    data() {
      return {
        typeList: [], //类型列表
        monData: [], //该月信息
        selectedData: "", //选中日期
        selectedWeek: [], //选中日期所在一周
        addDialogVisible: false, //行程增加弹框
        typeDialogVisible: false, //类型显示弹框
        form: { //增加行程表单
          name: '',
          startTime: '',
          endTime: '',
          type_id: ''
        },
        typeform: { //修改类型表单
          name: '',
          color: {}
        },
        listShow: false, //表格形式
        weekList: [] //一周表格数据
      }
    },
    methods: {
      classObject(item) {
        // console.log(parseInt(item.color.substr(1), 16) + 2000);
        return {
          'height': item.detail.height + 'px',
          'margin-top': item.detail.top + 'px',
          'background-color': this.getLighter(item.color, 0.3),
          'border-left': '2px solid ' + item.color
        }
      },
      getLighter(color, level) {
        var str = this.colorRgba(color, level)
        // console.log('...', str);
        return str;
      },
      colorRgba(str, n) {
        //十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = str.toLowerCase();
        n = n || 1;
        //十六进制颜色转换为RGB格式
        if (sColor && reg.test(sColor)) {
          let sColorChange = this.getRgbNum(sColor);
          return "rgba(" + sColorChange.join(",") + "," + n + ")";
        } else {
          return sColor;
        }
      },
      getRgbNum(sColor) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            //补全颜色值 例如：#eee,#fff等
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          //核心代码，通过parseInt将十六进制转为十进制，parseInt只有一个参数时是默认转为十进制的，第二个参数则是指定转为对应进制
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
      },
      submit() {
        const {
          name,
          type_id,
          startTime,
          endTime
        } = this.form;
        if (name == '' || name == null) {
          this.$message('名称必填');
        } else if (type_id == '' || type_id == null) {
          this.$message('类型必选');
        } else if (startTime == '' || startTime == null) {
          this.$message('时间必选');
        } else if (endTime == '' || endTime == null) {
          this.$message('时间必选');
        } else {
          // console.log(typeof startTime);
          this.addDialogVisible = false;
          addItinerary(name, type_id, util.formatTimeMysql(startTime), util.formatTimeMysql(endTime)).then(res => {
            if (res.status == 200) {
              this.$message('添加成功');
            }
          })
        }

      },
      submitType() {
        this.typeform.color = this.typeform.color.hex;
        // console.log(this.typeform);
        this.typeDialogVisible = false;
      },
      updateType(item) {
        // console.log(item);
        this.typeform.name = item.type_name;
        this.typeform.color = item.color;
        this.typeDialogVisible = true;
      },
      cpnclick(data) {
        // console.log('cpnclick', data)
        this.selectedData = util.formatDate(data.date)
        this.initWeekList();
        let begin = util.getWeek(data.date)[0];
        let end = util.getWeek(data.date)[1];
        // console.log(begin, end);
        this.selectedWeek = this.monData.slice(begin - 1, end);
        if (this.selectedWeek.length == 0) {
          this.selectedWeek = this.monData.slice(0, 7);
        }
        // console.log(this.selectedWeek);
      },
      initData() {
        getShowData().then(res => {
          // console.log(res.data);
          let temp = res.data.map(item => {
            return this.formData(item);
          })
          this.monData = temp;
          this.selectedWeek = this.monData.slice(0, 7);
        })
      },
      initTypeList() {
        getAllTypes().then(res => {
          // console.log(res);
          this.typeList = res.data;
          // console.log(this.typeList);
        })
      },
      initWeekList() {
        // console.log('this.selectedData:', this.selectedData);
        let date = new Date(this.selectedData)
        let timeFrom = util.formatTimeMysql(date.setDate(1))
        let timeEnd = util.formatTimeMysql(date.setDate((new Date(date.getFullYear(), parseInt(date.getMonth()), 0)).getDate()))
        // console.log(timeFrom, timeEnd);
        getWeekList(timeFrom, timeEnd).then(res => {
          this.weekList = res.data;
          console.log(res);
        })
      },
      formData(item) {
        // console.log(item);
        item.dateIndex = parseInt(item.date.substring(8, 10));
        item.day = util.getDay(item.date);
        item.weekDay = util.getWeekDay(item.date);
        item.itinerarys = util.getDetail(item.date, item.itinerarys);
        // console.log(item.itinerarys.length);
        return item;
      },
    },
    mounted() {
      this.initData();
      this.initTypeList();
      this.selectedData = util.formatDate(new Date());
      // console.log(date);
      this.initWeekList();
    }
  }
</script>

<style lang="less" scoped>
  @color : #4352d7;
  @font-color: #4a4f58;
  @font-color-t: #93969c;
  @font-color-un: #b6c1d4;
  @back-color-dark: #fbfbfb;

  .Home {
    background-color: #f5f7fb;
    width: calc(100vw);
    height: calc(100vh);
    overflow: hidden;

    .content {
      margin: 20px;
      height: calc(100vh - 80px);

      .left {
        width: 25%;
        float: left;
      }

      .right {
        width: 70%;
        padding-left: 40px;
        float: left;
        display: flex;
        flex-direction: column;

        .bar {
          float: left;
          display: flex;
          align-items: center;
        }

        .date-title {
          float: left;
          height: 35px;
          line-height: 35px;
          // width: 200px;
          text-align: left;
          font-weight: bold;
          font-size: 30px;
          color: @font-color;
        }

        .btns {
          margin-left: 20px;
          width: 80px;
          float: left;

          // color: #3442c0;

          .el-button {
            font-size: 15px;
            background-color: #fff;
            border-color: #fff;
            color: @font-color;
          }
        }

        .el-button {
          float: right;
          background-color: #4658f8;
          border-color: #4658f8;
          border-radius: 10px;
          font-size: 15px;
        }
      }

      .right {
        .data-table {
          height: 580px;
          background-color: #fff;
          margin-top: 20px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0px 5px 11px #f1f1f1;

          table {
            border-collapse: collapse;
          }

          .head-table {
            // padding-left: 55px;
            background-color: @back-color-dark;
            width: 100%;
            text-align: center;

          }

          .head-table tr th {
            width: calc(calc(100%)/ 8);
            height: 100px;
            color: @font-color-t;

            // table-layout: fixed;
            // border: 1px solid #0094ff;
          }



        }
      }

      .font-b {
        font-size: 30px;
        // font-weight: bold;
      }

      .font-s {
        font-size: 12px;
        font-weight: lighter;
      }
    }
  }

  .data-table {

    width: 100%;

    .table-head {
      padding-top: 20px;
      padding-left: 60px;
      height: 60px;
      vertical-align: text-top;
      display: flex;
      background-color: @back-color-dark;

      .table-head-item {
        flex: 1;
      }
    }

  }

  .iti-table {
    width: 100%;
    display: flex;

    .left-side {
      width: 70px;
      // height: 40px;
      // text-align: right;
      color: @font-color-t;
      font-size: 14px;
      // padding-right: 10px;

      .hour {
        top: 43px;
        height: 50px;
        position: relative;
        text-align: right;
        padding-right: 10px;
      }
    }

    .inner-box {
      width: 100%;
      position: relative;
    }

    .week-events-view {
      width: 100%;
      height: calc(24*50px);

      .day-cols {
        width: 100%;

        // display: flex;
        .day-col-day {
          width: calc(100% / 7);
          float: left;
          // margin-bottom: -1px;

          .day-col-hour {
            // flex: 1;
            width: 100%;
            height: 49px;
            border: 1px solid #f1f1f3;
            margin: 0px -1px -1px 0px;

            .day-col-content {
              position: relative;
              z-index: 1;
              font-size: 15px;
              color: @font-color;
            }
          }
        }

      }
    }

    .hour-lines {
      width: 100%;
      height: calc(24*50px);
      position: absolute;
      top: 0;
      left: 0;

      .day-col-day {
        width: calc(100% / 7);
        float: left;

        .day-col-hour {
          // flex: 1;
          width: 100%;
          height: 49px;
          // background-color: chocolate;
          border: 1px solid #f1f1f3;
          margin: 0px -1px -1px 0px;
          z-index: -10;
        }
      }
    }
  }

  .type-list {
    margin-top: 20px;
    padding: 20px;
    text-align: left;
    background-color: #fff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 5px 11px #f1f1f1;

    .status-point {
      display: inline-block;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      margin-right: 20px;
    }

    li {
      list-style: none;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
    }
  }

  .data-list {
    margin-top: 20px;
    padding-left: 15px;
    background-color: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 5px 11px #f1f1f1;
     .status-point {
      display: inline-block;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
</style>