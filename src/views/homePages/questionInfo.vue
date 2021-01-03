<template>
  <div class="question-info-page">
    <div class="question-box">
      <div><h3>{{ questionTitle }}</h3></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "questionInfo",
  data() {
    return {
      questionId: "",
      questionTitle: ""
    };
  },
  methods: {
    getQuestionData(id) {
      var url = "http://localhost:3000/question/queryByID";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          id: id
        }),
        success: res => {
          console.log(res);
          var content = res.info[0];
          this.questionTitle = content.question_title;
          this.questionInfo = content.question_info;
          this.anthorName = this.getName(content.user_id);
        },
        error: err => {
          console.log(err);
        }
      });
    },
    getName(id) {
      console.log(id);
    }
  },
  created() {
    this.questionId = this.$route.query.id;
    this.getQuestionData(this.questionId);
  }
};
</script>

<style lang="scss">
.question-info-page {
  width: 1000px;
  margin: 0 auto;
  .question-box {
    width: 100%;
  }
}
</style>
