<template>
  <div class="article-page-style">
    <div class="header-style">
      <div class="left-part">
        <span @click="cancelHome">CENTER</span>
      </div>
      <div class="middle-part">写文章</div>
      <div class="right-part">
        <el-popover
          placement="bottom"
          title="发布说明"
          width="400"
          trigger="click"
        >
          <div class="article-popover-box">
            <div class="popover-title">文章类别</div>
            <div class="popover-tag">
              <el-tag
                v-for="tag in tags"
                :key="tag.id"
                closable
                @close="handleClose(tag)"
                >{{ tag.value }}</el-tag
              >
            </div>
            <div>
              <el-autocomplete
                class="inline-input popover-input"
                v-model="tagValue"
                size="small"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
              <el-button type="text" class="popover-add-button" v-show="showAdd" @click="addTag"
                >暂无此标签，直接添加</el-button
              >
            </div>
            <div class="popover-title">发布声明</div>
            <div>
              <el-radio-group v-model="original">
                <el-radio-button label="0" class="radio-button margin-left20"
                  >原创虚构</el-radio-button
                >
                <el-radio-button label="1" class="radio-button margin-left20"
                  >学术研究</el-radio-button
                >
                <el-radio-button label="2" class="radio-button margin-left20"
                  >转载声明</el-radio-button
                >
              </el-radio-group>
            </div>
            <div class="popover-title">补充说明</div>
            <el-input
              type="textarea"
              maxlength="100"
              show-word-limit
              autosize
              v-model="tips"
            ></el-input>
            <el-button size="small" style="float: right; margin-top: 15px" @click="addArticle">确定</el-button>
          </div>
          <el-button
            type="primary"
            slot="reference"
            size="small"
            class="button-right-style"
            :disabled="canSubmit"
            >发布
            <i class="el-icon-arrow-down"></i>
          </el-button>
        </el-popover>
      </div>
    </div>
    <div class="middle-content-style">
      <div class="top-style">
        <el-input
          type="textarea"
          v-model="formData.title"
          class="input-style"
          placeholder="请输入文章标题（不超过50个字）"
          maxlength="50"
          show-word-limit
        ></el-input>
      </div>
      <div class="content-box">
        <editor-component
          v-model="formData.content"
          :isClear="true"
          placeValue="请输入文章内容"
          @change="change"
          :menu="menuList"
        ></editor-component>
      </div>
    </div>
  </div>
</template>

<script>
import EditorComponent from "../../components/editor/EditorComponent";
export default {
  name: "articlePage",
  components: { EditorComponent },
  data() {
    return {
      menuList: [],
      formData: {
        title: "",
        content: ""
      },
      visibleDialog: false,
      tags: [],
      tips: "",
      original: 0,
      tagValue: "",
      tagList: [],
      showAdd: false,
      canSubmit: true
    };
  },

  watch: {
    formData: {
      handler(newName) {
        if (newName.title !== "" && newName.content !== "") {
          this.canSubmit = false;
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    change(val) {
      console.log(val);
    },

    cancelHome() {
      this.$router.push({
        path: "/homePage"
      });
    },

    addArticle() {
      var url = window.requestUrl + "article/addArticle";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          arcticle_title: this.formData.title,
          user_id: this.$store.state.loginData.userId,
          content: this.formData.content,
          dt_create: new Date().getTime(),
          type: this.tags.map(x => x.value).join(","),
          tips: this.tips,
          original: this.original
        }),
        success: res => {
          console.log(res);
          if (res.status === 1) {
            this.$message.success("发表成功！");
            this.$router.push({
              path: "homePage"
            });
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },

    // formatData(list) {
    //   var str = "";
    //   for (var i = 0; i < list.length; i++) {
    //     str += i === 0 ? list[i] : "," + list[i];
    //   }
    //   return str;
    // },

    getTags() {
      var url = window.requestUrl + "tag/query";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        success: res => {
          console.log(res);
          this.tagList = res.info;
        },
        error: err => {
          console.log(err);
        }
      });
    },
    querySearch(queryString, cb) {
      var list = this.tagList;
      var result = queryString
        ? list.filter(this.createFilter(queryString))
        : list;
      console.log(result);
      this.showAdd = result.length === 0;
      cb(result);
    },
    createFilter(queryString) {
      return item => {
        return (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.tagValue = "";
      if (this.tags.length === 6) {
        this.$message.warning("最多添加6个标签");
        return false;
      }
      var hasContent = this.tags.find(
        x => x.id === item.tag_id
      );
      if (!hasContent) {
        var info = {
          id: item.tag_id,
          value: item.value
        };
        this.tags.push(info);
      }
    },

    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    addTag() {
      console.log(this.tagValue);
      var url = window.requestUrl + "tag/add";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          name: this.tagValue
        }),
        success: res => {
          console.log(res);
          if (this.tags.length === 6) {
            this.$message.warning("最多添加6个标签");
            return false;
          }
          var info = {
            id: res.info.insertId,
            value: this.tagValue
          };
          this.tags.push(info);
          this.tagValue = "";
        },
        error: err => {
          console.log(err);
        }
      });
    }
  },
  created() {
    this.getTags();
  }
};
</script>

<style lang="scss">
.article-page-style {
  width: 100%;
  height: 100%;
  .header-style {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 5px #666;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .middle-part {
      width: 1000px;
      line-height: 60px;
      color: #666666;
      font-size: 18px;
      box-sizing: border-box;
      padding-left: 15px;
    }
    .left-part {
      width: 100px;
      font-size: 24px;
      color: aquamarine;
      cursor: pointer;
    }
    .right-part {
      width: 100px;
    }
    .button-right-style {
      border-radius: 4px;
      width: 90px;
    }
  }
  .middle-content-style {
    width: 1000px;
    margin: 15px auto;
    background: #fff;
    overflow-y: auto;
    max-height: calc(100% - 62px);
    .top-style {
      height: 100px;
      width: 100%;
    }
    .input-style {
      width: 100%;
      height: 100%;
      font-size: 30px;
    }
    .content-box {
      width: 100%;
      min-height: 600px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .button-box {
      width: 100%;
      height: 60px;
      text-align: center;
      border-top: 1px solid #f6f6f6;
    }
    .button-style {
      width: 100px;
      margin-top: 15px;
    }
  }
}
.article-popover-box {
  .popover-title {
    height: 40px;
    line-height: 40px;
  }
  .popover-tag {
    width: 100%;
  }
  .el-radio-button__inner {
    border: 1px solid #dcdfe6;
    border-radius: 4px !important;
    padding: 8px 20px;
  }
  .el-tag--light {
    margin-right: 10px;
  }
  .margin-left20 {
    margin-right: 20px;
  }
  .popover-input {
    .el-input__inner {
      border-bottom: 1px solid #dcdfe6;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
    }
    margin-top: 10px;
  }
  .popover-add-button {
    margin-left: 15px;
  }
}
</style>
