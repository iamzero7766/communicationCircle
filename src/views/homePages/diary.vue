<template>
  <div class="diary-class">
    <div class="diary-box-style">
      <div class="top-box">
        <div v-for="item in titleList" :key="item.key" class="top-part-box">
          <div class="title-style">{{ item.name }}</div>
          <div class="value-style">{{ item.value }}</div>
        </div>
      </div>
      <div class="content-box">
        <div
          v-for="item in dataList"
          :key="item.day"
          :class="[item.day > 0 ? 'cursor-pointer' : '', 'content-box-style']"
          @click="showInfo(item)"
        >
          <div v-show="item.day > 0" class="txt-style">{{ item.day }}</div>
          <div v-show="item.day > 0">
            <img
              v-if="item.value >= 80"
              src="../../assets/personal/high.png"
              class="value-image-style"
            />
            <img
              v-if="item.value < 80 && item.value >= 50"
              src="../../assets/personal/normal.png"
              class="value-image-style"
            />
            <img
              v-if="item.value < 50"
              src="../../assets/personal/down.png"
              class="value-image-style"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="options-box">
      <el-date-picker v-model="month" type="month" style="width: 100%">
      </el-date-picker>
      <div class="date-picker">
        <el-button class="button-class">查询</el-button>
      </div>
      <div class="date-picker">
        <el-button class="button-class" @click="addToday">今日</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <div v-html="htmlContent"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "diary",
  components: {},
  data() {
    return {
      month: "",
      titleList: [
        { name: "日", key: 1, value: "SUN" },
        { name: "一", key: 2, value: "MON" },
        { name: "二", key: 3, value: "TUE" },
        { name: "三", key: 4, value: "WED" },
        { name: "四", key: 5, value: "THUR" },
        { name: "五", key: 6, value: "FRI" },
        { name: "六", key: 7, value: "SAT" }
      ],
      dataList: [],
      dialogVisible: false,
      htmlContent: ""
    };
  },
  created() {
    this.getMonthDate();
  },
  methods: {
    getMonthDate() {
      this.month = new Date();
      var month = new Date().getMonth() + 1; // 月
      // 这个月的第一天是星期几
      var firstDay = new Date().setDate(1);
      var firstWeek = new Date(firstDay).getDay();
      var monthDays = this.getDayNumber(new Date()); // 这个月有多少天
      var data = {};
      var dataList = [];
      console.log(monthDays);
      if (firstWeek > 0) {
        for (let i = 0; i < firstWeek; i++) {
          data = {
            month: month,
            day: 0
          };
          dataList.push(data);
        }
      }
      for (let m = 0; m < monthDays; m++) {
        data = {
          month: month,
          day: m + 1,
          value: 50,
          info: ""
        };
        dataList.push(data);
      }
      this.dataList = dataList;
      console.log(this.dataList);
    },

    // 获取当月的天数
    getDayNumber(date) {
      var curDate = new Date(date);
      var curMonth = curDate.getMonth();
      curDate.setMonth(curMonth + 1);
      curDate.setDate(0);
      return curDate.getDate();
    },


    // 获取当月日记内容
    getDiaryContent() {},

    // 获取当天日记
    showInfo(item) {
      console.log(item);
      this.dialogVisible = true;
      this.htmlContent = "<p>12</p><p><font size=\"3\">我们在现在在一起回事在那样</font><br></p><p>dddd<font face=\"Courier New\">撒网嚷嚷swwww</font><font size=\"3\"><br></font></p>"
    },

    addToday() {
      this.$router.push({
        path: "addToday"
      });
    }
  }
};
</script>

<style lang="scss">
.diary-class {
  width: 1215px;
  margin: 20px auto;
  .diary-box-style {
    width: 980px;
    float: left;
  }
  .options-box {
    width: 220px;
    float: left;
    margin-left: 10px;
    .date-picker {
      margin-top: 30px;
      width: 100%;
    }
    .button-class {
      width: 100%;
      background: #bc8f8f;
      color: #fff;
    }
  }
  .title-page-box {
    width: 980px;
    margin: 0 auto;
    height: 60px;
    .search-button {
      margin-left: 50px;
      width: 100px;
    }
  }
  .top-box {
    width: 100%;
    display: flex;
    height: 120px;
    border-top: 2px solid #b22222;
    border-bottom: 2px solid #b22222;
  }
  .top-part-box {
    flex: 1;
    height: 120px;
    background: rgba($color: #bc8f8f, $alpha: 1);
    text-align: center;
    .title-style {
      font-size: 24px;
      color: #fff;
      font-weight: 600;
      margin-top: 35px;
    }
    .value-style {
      font-size: 14px;
      color: #fff;
      font-weight: 300;
    }
  }
  .content-box {
    width: 100%;
  }
  .content-box-style {
    height: 120px;
    width: 140px;
    float: left;
    box-sizing: border-box;
    border-bottom: 2px solid #b22222;
    text-align: center;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .txt-style {
    font-size: 24px;
    margin-top: 30px;
    line-height: 30px;
  }
  .value-image-style {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
}
</style>
