<template>
  <div
    class="recommand-content-style"
    v-infinite-scroll="loadSet"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10">
    <div v-for="item in contentInfo" :key="item.id" class="content-box">
      <question-info-part :item="item"></question-info-part>
    </div>
  </div>
</template>

<script>
// import contentList from "@/localData/homeContent.js";
import formatFunction from "@/utils/formatHtml";
import QuestionInfoPart from "../questionComponents/QuestionInfoPart";
export default {
  name: "RecommandContent",
  components: {QuestionInfoPart},
  data() {
    return {
      contentInfo: [],
      pageNum: 0,
      busy: false,
      showBottom: false
    };
  },
  computed: {},
  created() {
    this.loadSet();
  },
  mounted() {},
  watch: {},
  methods: {
    getContentInfo(pageNum) {
      var start = pageNum * 10;
      var url = window.requestUrl + "question/query";
      this.$post(url, {
        start: start,
        num: 10
      }).then(res => {
        if (res.info.length === 0) {
          this.showBottom = true;
        }
        res.info.forEach(item => {
          var data = {
            id: item.question_id,
            title: item.question_title,
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
            console.log(dataFormat);
            data.image = dataFormat.img;
            data.content = dataFormat.text;
            data.authorName = contentParam.user_name;
            data.htmlText = contentParam.answer_info;
          }
          this.contentInfo.push(data);
        });
        this.pageNum++;
        this.busy = false;
      });
    },
    loadSet() {
      if (this.showBottom) return;
      this.busy = true;
      this.$nextTick(() => {
        this.getContentInfo(this.pageNum);
      });
    }
  }
};
</script>

<style lang="scss">
.recommand-content-style {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .cursor-pointer {
    cursor: pointer;
    padding: 0;
  }
  .content-box {
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
  }
  .image-box {
    width: 100%;
    margin-top: 10px;
    height: 110px;
  }
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
    width: 450px;
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
  .article-style {
    width: 100%;
    font-size: 15px;
    height: 50px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .comment-box {
    width: 100%;
    height: 45px;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .comment-button {
    color: #0084ff;
    background: rgba(0, 132, 255, 0.1);
    border: 0;
  }
  .padding-button {
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }
  .img-style {
    width: 20px;
    height: 20px;
  }
  .image-text-comment {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-left: 40px;
    cursor: pointer;
    color: #8590a6;
  }
  .img-flex {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
