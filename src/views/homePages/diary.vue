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
          <div v-show="item.day > 0 && item.isShow">
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
      <el-date-picker
        value-format="timestamp"
        v-model="month"
        type="month"
        style="width: 100%"
      >
      </el-date-picker>
      <div class="date-picker">
        <el-button class="button-class" @click="searchDate">查询</el-button>
      </div>
      <div class="date-picker">
        <el-button class="button-class" @click="addToday">今日</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      class="dialog-class"
      :title="todayTitle"
    >
      <div class="dialog-top-box">
        <div class="dialog-one-part">天气： {{ todayType }}</div>
        <div class="dialog-one-part">温度： {{ todayTemp }}</div>
        <div class="dialog-one-part">心情： {{ todayValue }}</div>
      </div>
      <div v-html="htmlContent" class="content-dialog"></div>
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
      htmlContent: "",
      todayTitle: "",
      todayType: "",
      todayTemp: "",
      todayValue: ""
    };
  },
  created() {
    this.month = new Date();
    this.getMonthDate(this.month);
  },
  methods: {
    // 获取当月最后一天或第一天 的 时间戳
    getDay(date) {
      var newDate = new Date(date);
      var firstDay = new Date(newDate.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      return [firstDay, lastDay];
    },

    searchDate() {
      console.log(this.month);
      this.getMonthDate(this.month);
    },

    getMonthDate(dateValue) {
      var month = new Date(dateValue).getMonth() + 1; // 月
      var year = new Date(dateValue).getFullYear();
      // 这个月的第一天是星期几
      var firstDay = new Date(dateValue).setDate(1);
      var firstWeek = new Date(firstDay).getDay();
      var monthDays = this.getDayNumber(dateValue); // 这个月有多少天
      var data = {};
      var dataList = [];
      console.log(monthDays);
      if (firstWeek > 0) {
        for (let i = 0; i < firstWeek; i++) {
          data = {
            year: year,
            month: month,
            day: 0
          };
          dataList.push(data);
        }
      }
      for (let m = 0; m < monthDays; m++) {
        data = {
          year: year,
          month: month,
          day: m + 1,
          isShow: false,
          value: 50,
          detail: "",
          type: "",
          temp: ""
        };
        dataList.push(data);
      }
      this.dataList = dataList;
      var date = this.getDay(new Date());
      this.getDiaryContent(date[0], date[1]);
    },

    // 获取当月的天数
    getDayNumber(date) {
      var curDate = new Date(date);
      var newdate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
      return newdate.getDate();
    },

    // 获取当月日记内容
    getDiaryContent(start, end) {
      var url = "http://localhost:3000/diary/queryMonth";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          dt_start: start.getTime() / 1000,
          dt_end: end.getTime() / 1000
        }),
        success: res => {
          console.log(res);
          if (res.info.length === 0) return;
          res.info.forEach(item => {
            var month = new Date(item.dt_create * 1000).getMonth() + 1;
            var day = new Date(item.dt_create * 1000).getDate();
            var year = new Date(item.dt_create * 1000).getFullYear();
            var hasContent = this.dataList.find(
              x => x.month === month && x.day === day && x.year === year
            );
            if (hasContent) {
              hasContent.value = item.value;
              hasContent.temp = item.temp;
              hasContent.type = item.type;
              hasContent.detail = item.content;
              hasContent.isShow = true;
            }
          });
          console.log(this.dataList);
        },
        error: err => {
          console.log(err);
        }
      });
    },

    // 获取当天日记
    showInfo(item) {
      console.log(item);
      if (!item.isShow) return;
      this.dialogVisible = true;
      this.htmlContent = item.detail;
      this.todayTitle = item.year + "-" + item.month + "-" + item.day;
      this.todayType = item.type;
      this.todayTemp = item.temp;
      this.todayValue = item.value;
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
  .dialog-class {
    .el-dialog {
      width: 700px;
    }
    .dialog-top-box {
      width: 100%;
      height: 40px;
      display: flex;
      border-bottom: 1px dotted #ddd;
    }
    .dialog-one-part {
      flex: 1;
      text-align: center;
      line-height: 40px;
    }
    .content-dialog {
      padding: 15px 0;
    }
  }
}
</style>
