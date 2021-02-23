<template>
  <div class="app-header-style">
    <div class="app-header-title" @click="routerHome">{{ appName }}</div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">问答</el-menu-item>
      <el-menu-item index="2">文章</el-menu-item>
    </el-menu>
    <el-autocomplete
      v-model="inputSearch"
      :fetch-suggestions="querySearchAsync"
      class="input-style"
      :placeholder="placeholder"
      :trigger-on-focus="false"
      @select="handleSelectSearch"
    ></el-autocomplete>
    <el-button class="button-style" @click="askClick">提问</el-button>
    <div class="avator-style">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-avatar :size="40" :src="avator" fit="contain"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" command="1"
            >我的主页</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-setting" command="2"
            >设置</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-close" command="3"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      title="MYquestion"
      :visible.sync="visibleDialog"
      :append-to-body="true"
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
      <el-checkbox v-model="checked" style="margin-top: 15px"
        >我要匿名</el-checkbox
      >
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleDialog = false">取 消</el-button>
        <el-button type="primary" @click="addQuestion">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EditorComponent from "../components/editor/EditorComponent";
import bus from "../utils/bus.js";
export default {
  name: "AppHeader",
  components: { EditorComponent },
  data() {
    return {
      appName: "CENTER",
      activeIndex: "1",
      placeholder: "请输入你想搜索的问答",
      inputSearch: "",
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
      placeValue: "详细描述具体问题",
      avator: this.$store.state.avatar,
      questionList: [],
      articleList: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    bus.$on("avatar", args => {
      this.avator = args;
    });
    this.searchQuestionAll();
    this.searchArticleAll();
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      this.activeIndex = key;
      if (key == 1) {
        this.placeholder = "请输入你想搜索的问答";
        this.$router.push({
          path: "homePage"
        });
      } else if (key == 2) {
        this.placeholder = "请输入你想搜索的文章";
        this.$router.push({
          path: "homeArticle"
        });
      }
    },

    handleCommand(command) {
      console.log(command);
      if (command === "2") {
        // 设置
        this.$router.push({
          path: "/userInfo"
        });
      } else if (command === "1") {
        // 主页
        this.$router.push({
          path: "/myHomepage",
          query: {
            id: this.$store.state.loginData.userId
          }
        });
      } else {
        // 退出
        this.logout();
      }
    },

    askClick() {
      this.visibleDialog = true;
      this.questionTitle = "";
      this.questionInfo = "";
      this.checked = false;
    },
    routerHome() {
      this.$router.push({
        path: "/homePage"
      });
      location.reload();
    },

    logout() {
      this.$router.replace({
        path: "/loginPage"
      });
      var loginData = {
        isLogin: false,
        userId: "",
        userName: "",
        userInfo: ""
      };
      this.$store.commit("setLoginData", loginData);
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
            this.$router.push({
              path: "questionInfo",
              query: {
                id: res.info.insertId
              }
            });
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },

    querySearchAsync(queryString, cb) {
      var list = this.activeIndex == "1" ? this.questionList : this.articleList;
      var results = queryString ? list.filter(this.createFilter(queryString)) : [];
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return item => {
        if(this.activeIndex == "1") {
          return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
        } else {
          return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
        }
      };
    },
    handleSelectSearch(item) {
      if(this.activeIndex == "1") {
        this.$router.push({
          path: "questionInfo",
          query: {
            id: item.id
          }
        });
      } else {
        this.$router.push({
          path: "showArticlePage",
          query: {
            id: item.id
          }
        });
      }
    },

    searchQuestionAll() {
      var url = "http://localhost:3000/question/queryAll";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        success: res => {
          this.questionList = res.info;
          this.questionList.map(item => {
            item.value = item.question_title;
            item.id = item.question_id;
          });
        },
        error: err => {
          console.log(err);
        }
      });
    },
    searchArticleAll() {
      var url = "http://localhost:3000/article/queryAll";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        success: res => {
          this.articleList = res.info;
          this.articleList.map(item => {
            item.value = item.arcticle_title;
            item.id = item.arcticle_id;
          });
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
  position: fixed;
  top: 0;
  z-index: 999;
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
      border-radius: 20px;
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
