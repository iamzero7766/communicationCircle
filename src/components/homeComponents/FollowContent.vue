<template>
  <div
    class="recommand-content-style"
    v-infinite-scroll="loadSet"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <div v-for="item in followInfo" :key="item.id" class="content-box">
      <question-info-part :item="item"></question-info-part>
    </div>
  </div>
</template>

<script>
import formatFunction from "@/utils/formatHtml";
import QuestionInfoPart from "../questionComponents/QuestionInfoPart";
export default {
  name: "FollowContent",
  components: {QuestionInfoPart},
  data() {
    return {
      followInfo: [],
      pageNum: 0,
      busy: false
    };
  },
  methods: {
    getContentInfo(pageNum) {
      var start = pageNum * 10;
      var url = window.requestUrl + "follow/queryByUserQuestion";
      this.$jq.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          user_id: this.$store.state.loginData.userId,
          start: start,
          end: 10
        }),
        success: res => {
          res.info.forEach(item => {
            var data = {
              id: item.questionInfo.question_id,
              title: item.questionInfo.question_title,
              image: null,
              isshow: false,
              showContent: false,
              authorName: "",
              content: "",
              htmlText: ""
            };
            if (item.answeInfo.length > 0) {
              var contentParam = item.answeInfo[0];
              data.isshow = true;
              var dataFormat = formatFunction.formatText(
                contentParam.answer_info
              );
              data.image = dataFormat.img;
              data.content = dataFormat.text;
              data.authorName = contentParam.user_name;
              data.htmlText = contentParam.answer_info;
            }
            this.followInfo.push(data);
          });
          this.pageNum++;
          this.busy = res.info.length === 0;
        },
        error: err => {
          console.log(err);
        }
      });
    },
    loadSet() {
      this.busy = true;
      this.$nextTick(() => {
        this.getContentInfo(this.pageNum);
      });
    }
  },
  created() {
    this.loadSet();
  }
};
</script>

<style lang="scss"></style>
