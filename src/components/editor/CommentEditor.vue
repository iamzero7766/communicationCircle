<template lang="html">
  <div class="comment-editor-component">
    <div
      ref="toolbar"
      class="editor-component-toolbar"
      v-show="showHeader"
    ></div>
    <div ref="editor" class="editor-component-text"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "CommentEditor",
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    placeValue: {
      type: String,
      default: "请输入内容"
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    }
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    seteditor() {
      // 菜单
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link"
      ];
      this.editor.config.placeholder = this.placeValue;
      this.editor.config.uploadImgShowBase64 = false;
      this.editor.config.showLinkImg = false;
      this.editor.config.uploadImgServer = window.requestUrl + "image";
      this.editor.config.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.config.uploadImgMaxLength = 1; // 限制一次最多上传 3 张图片
      this.editor.config.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      this.editor.config.onchange = html => {
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("change", this.info_); // 将内容同步到父组件中
      };

      console.log(this.menu);
      // 创建富文本编辑器
      this.editor.create();
    }
  }
};
</script>

<style lang="css">
.comment-editor-component {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.editor-component-toolbar {
  border: 1px solid #ccc;
}
.editor-component-text {
  min-height: 40px;
  border: 0;
}
</style>
