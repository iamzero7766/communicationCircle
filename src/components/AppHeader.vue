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
    <editor-set
      :visible.sync="visibleDialog"
      @modalClose="modalClick"
    ></editor-set>
  </div>
</template>

<script>
import E from "wangeditor";
import EditorSet from "./editor/EditorSet.vue";
export default {
  components: { EditorSet },
  name: "AppHeader",
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
      createTaskloading: false
    };
  },
  computed: {},
  created() {
    // this.initEditor();
  },
  mounted() {},
  methods: {
    handleSelect(key) {
      console.log(key);
    },

    askClick() {
      this.visibleDialog = true;
    },

    initEditor() {
      this.editor = new E("#editor");
      this.editor.create();
    },

    modalClick(value) {
      this.visibleDialog = value;
    },

    routerHome() {
      this.$router.push({
        path: "/"
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
}
</style>
