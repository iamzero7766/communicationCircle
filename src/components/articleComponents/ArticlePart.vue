<template>
  <div class="article-part-component">
    <div class="tag-box">
      <el-tag class="margin-right15"
              v-for="content in info.tagList"
              :key="content"
      >{{ content }}</el-tag>
    </div>
    <div class="title-box" @click="showArticle(info.arcticle_id)">
      {{ info.arcticle_title }}
    </div>
    <div class="info-other-box">编辑于{{ info.day }}</div>
  </div>
</template>

<script>
export default {
  name: "ArticlePart",
  data() {
    return {};
  },
  props: {
    info: {
      default: {}
    }
  },
  methods: {
    showArticle(id) {
      this.$router.push({
        path: "showArticlePage",
        query: {
          id: id
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="scss">
.article-part-component {
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
  padding: 10px 0;
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
