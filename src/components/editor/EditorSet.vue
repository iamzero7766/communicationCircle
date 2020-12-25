<template>
  <div class="editor-dialog">
    <el-dialog title="MYquestion" :visible.sync="visible">
      <el-input placeholder="请输入文章标题"></el-input>
      <div ref="editor1" class="editor-class"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="askTitle">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Editor from "wangeditor";
export default {
  name: "EditorSet",
  data() {
    return {
      editor: null,
      func: {
        initEditor: null
      }
    };
  },
  created() {
    this.initEditor();
  },
  mounted() {},
  watch: {
    visible(val) {
      if (val) {
        this.initDispatch();
      }
    }
  },
  methods: {
    initDispatch() {
      this.$nextTick(() => {
        this.initEditor();
      });
    },

    initEditor() {
      this.editor = new Editor(this.$refs.editor1);
      this.editor.config.menus = ["bold", "italic", "image", "video", "link"];
      this.editor.create();
    },

    closeModal() {
      this.editor.destroy();
      this.editor = null;
      this.$emit("modalClose", false);
    },

    askTitle() {}
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.editor-dialog {
  .el-dialog {
    width: 600px;
  }
  .editor-class {
    margin-top: 20px;
  }
}
</style>
