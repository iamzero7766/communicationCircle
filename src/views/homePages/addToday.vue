<template>
  <div class="add-today-class">
    <div class="top-title">
      <div class="date-class">{{ nowDate }}</div>
      <div class="weather-class">{{ weather }}</div>
    </div>
    <div class="content-box">
      <editor-component v-model="detail" :isClear="isClear" @change="change" :menu="menuList"></editor-component>
    </div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import EditorComponent from "../../components/editor/EditorComponent";
export default {
  name: "addToday",
  components: { EditorComponent },
  data() {
    return {
      nowDate: "",
      weather: "阴天",
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
    }
  },
  created() {
    this.nowDate = this.getDate();
    // this.initEditor();
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
}
</style>
