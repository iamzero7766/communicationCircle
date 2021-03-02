<template>
  <div class="info-article-box-component"
       v-infinite-scroll="loadSet"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="10">
    <div v-for="item in articleList"
         class="info-box"
         :key="item.arcticle_id">
      <div class="tag-box">
        <el-tag
          class="margin-right15"
          v-for="content in item.tagList"
          :key="content"
        >{{ content }}</el-tag>
      </div>
      <div class="title-box" @click="showArticle(item.arcticle_id)">
        {{ item.arcticle_title }}
      </div>
      <div class="info-other-box">
        编辑于{{ item.day }}
      </div>
    </div>
  </div>
</template>

<script>
import formatFunction from "@/utils/formatHtml";
export default {
  name: "InfoArticle",
  data() {
    return {
      myID: this.$store.state.loginData.userId,
      articleList: [],
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
        this.getArticleInfo(this.pageNum);
      });
    },

    getArticleInfo(page) {
      var start = page * 10;
      var url = window.requestUrl + "article/queryByUser";
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
          this.busy = res.info.length === 0;
        },
        error: err => {
          console.log(err);
        }
      });
    },

    showArticle(id) {
      this.$router.push({
        path: "showArticlePage",
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
.info-article-box-component {
  width: 100%;
  height: 100%;
  .info-box {
    width: 100%;
    border-bottom: 1px solid #f6f6f6;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .tag-box {
    margin-bottom: 5px;
    .margin-right15 {
      margin-right: 15px;
    }
    .el-tag {
      height: 26px;
      line-height: 24px;
    }
  }
  .title-box {
    width: 100%;
    line-height: 40px;
    color: #666666;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
  .info-other-box {
    width: 100%;
    color: #666666;
    font-size: 12px;
    line-height: 20px;
  }
}  
</style>
