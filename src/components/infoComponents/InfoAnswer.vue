<template>
  <div class="info-answer-component"
       v-infinite-scroll="loadSet"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="10">
    <div
      v-for="item in answerList"
      :key="item.id"
      class="answer-box"
    >
      <div class="title-box" @click="toQuestion(item.id)">
        <h3>{{ item.question_title }}</h3>
      </div>
      <div v-show="item.showContent && item.image" class="img-box">
        <el-image :src="item.image" class="image-style" fit="contain"></el-image>
        <div class="image-article-style"> 我的回答：{{ item.content }}</div>
      </div>
      <div v-show="item.showContent && !item.image" class="content-box">我的回答：{{ item.content }}</div>
      <div v-show="!item.showContent" class="html-box" v-html="item.answer_info"></div>
      <div class="button-box">
        <el-button
          type="text"
          style="float: left"
          @click="item.showContent = !item.showContent"
        >
          {{ item.showContent ? "查看完整回答" : "收起"}}
        </el-button>
        <el-button type="text" style="float: right" v-show="user_id == myID">修改回答</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import formatFunction from "@/utils/formatHtml";
export default {
  name: "InfoAnswer",
  data() {
    return {
      myID: this.$store.state.loginData.userId,
      // user_id: this.$store.state.loginData.userId,
      answerList: [],
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
        this.getAnswerInfo(this.pageNum);
      });
    },

    getAnswerInfo(page) {
      var start = page * 10;
      var url = window.requestUrl + "answer/queryByUser";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          id: this.user_id,
          start: start,
          end: 10
        }),
        success: res => {
          console.log(res);
          var resInfo = res.info;
          resInfo.forEach(item => {
            item.id = item.questionInfo.question_id;
            item.question_title = item.questionInfo.question_title;
            item.showContent = true;
            var result = formatFunction.formatAnswer(item.answer_info);
            item.image = result.img;
            item.content = result.text;
          });
          if (page === 0) {
            this.answerList = resInfo;
          } else {
            this.answerList = this.answerList.concat(resInfo);
          }
          this.pageNum++;
          this.busy = res.info.length === 0;
        },
        error: err => {
          console.log(err);
        }
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
.info-answer-component {
  width: 100%;
  .answer-box {
    width: 100%;
  }
  .title-box {
    cursor: pointer;
  }
  .img-box {
    width: 100%;
    height: 120px;
    .image-style {
      width: 190px;
      height: 105px;
      border-radius: 3px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      float: left;
    }
    .image-article-style {
      width: 750px;
      margin-left: 10px;
      font-size: 15px;
      float: left;
      height: 100px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
    }
  }
  .content-box {
    width: 100%;
    height: 50px;
    line-height: 25px;
    font-size: 15px;
    overflow: hidden;
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
