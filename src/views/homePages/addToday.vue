<template>
  <div class="add-today-class">
    <div class="top-title">
      <div class="date-class">{{ nowDate }}</div>
      <div class="weather-class">
          {{ weather }}
          <span style="margin-left: 10px"> {{ temp }}</span>
      </div>
    </div>
    <div class="content-box">
      <editor-component v-model="detail" :isClear="isClear" @change="change" :menu="menuList"></editor-component>
    </div>
    <div class="bottom-class">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary">确定添加</el-button>
    </div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import EditorComponent from "../../components/editor/EditorComponent";
import AMap from "vue-amap";
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
      menuList: ["fontSize", "fontName", "emoticon", "image", ""]
    };
  },
  methods: {
    getDate() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var now = year + " 年 " + month + " 月 " + day + " 日 ";
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


    getLocation() {
      AMap.plugin('')
    }


  },
  created() {
    this.nowDate = this.getDate();
    this.refreshWeather();
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
  .content-box {
    width: 100%;
    min-height: 600px;
    box-sizing: border-box;
    padding: 20px;
  }
  .bottom-class {
    width: 100%;
    height: 50px;
    text-align: center;
  }
}
</style>
