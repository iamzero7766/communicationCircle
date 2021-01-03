<template>
  <div class="app-header-style">
    <div class="app-header-title" @click="routerHome">{{ appName }}</div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">会员</el-menu-item>
      <el-menu-item index="3">发现</el-menu-item>
      <el-menu-item index="4">等你来答</el-menu-item>
    </el-menu>
    <el-input :placeholder="placeholder" class="input-style">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button class="button-style" @click="askClick">提问</el-button>
    <el-badge :value="messageNum" :max="99" class="item">
      <el-button class="message-button message-icon"></el-button>
    </el-badge>
    <el-badge :value="infoNum" :max="99" class="item">
      <el-button class="message-button chat-icon"></el-button>
    </el-badge>
    <div class="avator-style">
      <el-avatar
        :size="40"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        fit="contain"
      ></el-avatar>
    </div>

    <el-dialog
      title="MYquestion"
      :visible.sync="visibleDialog"
      class="dialog-box"
    >
      <el-input
        placeholder="请输入文章标题"
        maxlength="50"
        type="textarea"
        show-word-limit
        v-model="questionTitle"
      ></el-input>
      <editor-component
        v-model="questionInfo"
        class="editor-box"
        :isClear="isClear"
        :placeValue="placeValue"
        @change="change"
        :menu="menuList"
      ></editor-component>
      <el-checkbox v-model="checked" style="margin-top: 15px">我要匿名</el-checkbox>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleDialog = false">取 消</el-button>
        <el-button type="primary" @click="addQuestion">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EditorComponent from "../components/editor/EditorComponent";
export default {
  name: "AppHeader",
  components: { EditorComponent },
  data() {
    return {
      appName: "CENTER",
      activeIndex: "1",
      placeholder: "hhhhhhh",
      messageNum: 22,
      infoNum: 10,
      avatorUrl: "../assets/avator.jpg",
      visibleDialog: false,
      editor: null,
      title: "",
      showCreateTaskModal: false, // 新增任务弹出框显示标识：默认不显示
      createTaskloading: false,
      isClear: false,
      menuList: ["fontSize", "fontName", "emoticon", "image", ""],
      questionTitle: "",
      questionInfo: "",
      checked: false,
      placeValue: "详细描述具体问题"
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleSelect(key) {
      console.log(key);
    },

    askClick() {
      this.visibleDialog = true;
    },
    routerHome() {
      this.$router.push({
        path: "/"
      });
    },

    change(val) {
      console.log(val);
    },

    addQuestion() {
      if (this.questionTitle.length === 0) {
        this.$message({
          message: "标题请不要为空",
          type: "warning"
        });
        return;
      }
      var url = "http://localhost:3000/question/addQuestion";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          dt_create: new Date().getTime(),
          title: this.questionTitle,
          info: this.questionInfo,
          anonymous: this.checked ? 1 : 0
        }),
        success: res => {
          console.log(res);
          if (res.status === 1) {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            this.visibleDialog = false;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.app-header-style {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 5px #ddd;
  background: #fff;
  .app-header-title {
    width: 100px;
    height: 100%;
    line-height: 60px;
    font-size: 24px;
    color: aquamarine;
    margin-left: 20%;
    float: left;
    cursor: pointer;
  }
  .el-menu-demo {
    float: left;
    margin-left: 50px;
    height: 100%;
  }
  .input-style {
    width: 400px;
    margin-left: 50px;
    .el-input__inner {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border-right-width: 0;
    }
    .el-input-group__append {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: #fff;
      border-left-width: 0;
    }
  }
  .button-style {
    width: 100px;
    border-radius: 20px;
    background: steelblue;
    color: #fff;
    border: 0;
    margin-left: 50px;
  }
  .message-button {
    width: 40px;
    background-position: center;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 70%;
    margin-left: 40px;
    border: 0;
  }
  .message-icon {
    background-image: url("../assets/message.png");
  }
  .chat-icon {
    background-image: url("../assets/chat.png");
  }
  .avator-style {
    margin-left: 50px;
  }
  .question-dialog-class {
    .el-dialog {
      width: 600px;
    }
    .editor-class {
      min-height: 300px;
    }
  }
  .dialog-box {
    .editor-box {
      margin-top: 10px;
    }
  }
}
</style>
