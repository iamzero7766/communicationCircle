<template>
  <div class="add-today-class">
    <div class="top-title">
      <div class="date-class">{{ nowDate }}</div>
      <div class="weather-class">
          {{ weather }}
          <span style="margin-left: 10px"> {{ temp }}</span>
      </div>
    </div>
    <div class="slider-box">
      <div class="text-style">今日心情值：</div>
      <el-slider v-model="happyNumber" class="slider-style" show-input></el-slider>
    </div>
    <div class="content-box">
      <editor-component v-model="detail" :isClear="isClear" @change="change" :menu="menuList"></editor-component>
    </div>
    <div class="bottom-class">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确定发布</el-button>
    </div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import EditorComponent from "../../components/editor/EditorComponent";
// import AMap from "vue-amap";
export default {
  name: "addToday",
  components: { EditorComponent },
  data() {
    return {
      nowDate: "",
      weather: "",
      temp: "",
      editor: null,
      isClear: false,
      detail: "",
      menuList: ["fontSize", "fontName", "emoticon", "image", ""],
      hasToday: false,
      dt_create: "",
      happyNumber: 50,
    };
  },
  methods: {
    getDate() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var day = new Date().getDate();
      day = day < 10 ? "0" + day : day;
      var now = year + "-" + month + "-" + day;
      return now;
    },
    initEditor() {
      this.editor = new Editor(this.$refs.editor1);
      this.editor.create();
    },
    change(val) {
      console.log(val);
    },
    cancel() {
      this.$router.push({
        path: "/diary"
      });
    },
    refreshWeather() {
      this.$jq.ajax({
        url: "http://wthrcdn.etouch.cn/weather_mini",
        type: "get",
        data: {
          city: "上海"
        },
        success: (res) => {
          console.log(res);
          var result = res.data.forecast[0];
          this.weather = result.type;
          this.temp = result.low.substring(3) + "~" + result.high.substring(3);
        },
        error: (err) => {
          console.log(err);
        }
      })
    },


    getInfoToday() {

      var url = window.requestUrl + "diary/queryToday";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: 'application/json',
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          dt_create: this.dt_create
        }),
        success: (res) => {
          console.log(res);
          if(res.info.length > 0) {
            this.hasToday = true;
            this.detail = res.info[0].content;
            this.happyNumber = res.info[0].value;
          } else {
            this.hasToday = false;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })

    },

    submit() {
      if(this.hasToday) {
        this.updateToday();
      } else {
        this.addToday();
      }
    },

    addToday() {
      if(this.detail == "") {
        this.$message({
          message: "请填写内容",
          type: "warnning"
        });
        return;
      }
      var url = window.requestUrl + "diary/addDiary";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: 'application/json',
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          temp: this.temp,
          dt_create: this.dt_create,
          type: this.weather,
          value: this.happyNumber,
          content: this.detail,
        }),
        success: (res) => {
          console.log(res);
          if(res.status == 1) {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            this.$router.push({
              path: "/diary"
            });
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    },

    updateToday() {
      if (this.detail === "") {
        this.$message({
          message: "请填写内容",
          type: "warnning"
        });
        return;
      }
      var url = window.requestUrl + "diary/updateDiary";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          value: this.happyNumber,
          dt_create: this.dt_create,
          content: this.detail
        }),
        success: res => {
          console.log(res);
          if (res.status === 1) {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.$router.push({
              path: "/diary"
            });
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }




  },
  created() {
    this.nowDate = this.getDate();
    this.dt_create = new Date(this.nowDate).getTime() / 1000;
    this.refreshWeather();
    this.getInfoToday();
  }
};
</script>

<style lang="scss">
.add-today-class {
  width: 800px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0 0 5px #ddd;
  .top-title {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    .date-class {
      float: left;
      margin-left: 20px;
    }
    .weather-class {
      float: right;
      margin-right: 20px;
    }
  }
  .slider-box {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 10px 20px;
    .text-style {
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .slider-style {
      float: left;
      width: 500px;
      margin-left: 20px;
    }
    .el-slider__runway {
      /*background: linear-gradient(to right,#2C2C2C, #1296DB 50%, #D81E06 70%);*/
    }
  }
  .content-box {
    width: 100%;
    min-height: 600px;
    box-sizing: border-box;
    padding: 10px 20px 20px 20px;
  }
  .bottom-class {
    width: 100%;
    height: 50px;
    text-align: center;
  }
}
</style>
