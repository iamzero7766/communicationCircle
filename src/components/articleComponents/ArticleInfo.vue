<template>
  <div class="article-info-component"
       v-infinite-scroll="loadSet"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="10"
  >
    <div class="info-box" v-for="item in articleList" :key="item.arcticle_id">
      <article-part :info="item"></article-part>
    </div>
  </div>
</template>

<script>
import formatFunction from "@/utils/formatHtml";
export default {
  name: "ArticleInfo",
  components: {
    ArticlePart: () => import("./ArticlePart")
  },
  data() {
    return {
      articleList: [],
      busy: false,
      pageNum: 0
    };
  },
  methods: {
    loadSet() {
      this.busy = true;
      this.$nextTick(() => {
        this.getInfo(this.pageNum);
      });
    },

    getInfo(page) {
      var url = window.requestUrl + "article/query";
      var startNum = page * 10;
      this.$post(url, {
        start: startNum,
        end: 10
      }).then(res => {
        res.info.forEach(item => {
          item.tagList = item.type.split(",");
          item.day = formatFunction.formatDate(parseInt(item.dt_create));
        });
        if (page === 0) {
          this.articleList = res.info;
        } else {
          this.articleList = this.articleList.concat(res.info);
        }
        this.pageNum++;
        this.busy = (res.info.length === 0);
      });
    }
  },
  created() {
    this.loadSet();
  }
};
</script>

<style lang="scss">
.article-info-component {
  width: 100%;
  min-height: 200px;
  box-sizing: border-box;
  padding: 0 15px;
  .info-box {
    width: 100%;
  }
}
</style>
