<template>
  <div
    class="info-question-component"
    v-infinite-scroll="loadSet"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <div v-for="item in questionList"
         class="item-style"
         :key="item.question_id">
      <div class="title-box" @click="toQuestion(item.question_id)">
        <h3>{{ item.question_title }}</h3>
      </div>
      <div class="content-text" v-show="item.showContent">{{ item.content }}</div>
      <div class="html-text" v-show="!item.showContent" v-html="item.question_info"></div>
      <div class="button-box">
        <el-button type="text" style="float: left" @click="item.showContent = !item.showContent">
          {{ item.showContent ? "查看完整内容" : "收起"}}
        </el-button>
        <el-button type="text" style="float: right" v-show="user_id == myID">修改问题描述</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import formatFunction from "@/utils/formatHtml";
export default {
  name: "InfoQuestion",
  data() {
    return {
      myID: this.$store.state.loginData.userId,
      // user_id: this.$store.state.loginData.userId,
      questionList: [],
      busy: false,
      pageNum: 0
    };
  },
  props: {
    user_id: {
      default: 0
    }
  },
  watch: {
    user_id() {
      this.pageNum = 0;
      this.loadSet();
    }
  },
  methods: {

    loadSet() {
      this.busy = true;
      this.$nextTick(() => {
        this.getQuestionList(this.pageNum);
      });
    },

    getQuestionList(page) {
      var start = page * 10;
      var url = window.requestUrl + "question/queryByUser";
      this.$post(url, {
        id: this.user_id,
        start: start,
        end: 10
      }).then(res => {
        var info = res.info;
        info.forEach(item => {
          item.content = formatFunction.formatHtml(item.question_info);
          item.showContent = true;
        });
        if (page === 0) {
          this.questionList = info;
        } else {
          this.questionList = this.questionList.concat(info);
        }
        this.pageNum++;
        this.busy = res.info.length === 0;
      });
    },

    toQuestion(id) {
      this.$router.push({
        path: "questionInfo",
        query: {
          id: id
        }
      });
    }
  },
  created() {
    this.pageNum = 0;
    this.loadSet();
  }
};
</script>

<style lang="scss">
.info-question-component {
  width: 100%;
  height: 100%;
  .item-style {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .title-box {
    cursor: pointer;
  }
  .content-text {
    width: 100%;
    line-height: 30px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .button-box {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #f6f6f6;
  }
}
</style>
