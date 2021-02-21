<template>
  <div class="home-article-page">
    <div class="top-title">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">广场</el-menu-item>
        <el-menu-item index="2">分类</el-menu-item>
      </el-menu>
    </div>
    <article-info v-show="activeIndex === '1'"></article-info>
    <tag-component v-show="activeIndex === '2'"></tag-component>
  </div>
</template>

<script>
import ArticleInfo from "../../components/articleComponents/ArticleInfo";
import TagComponent from "../../components/articleComponents/TagComponent";
export default {
  name: "homeArticle",
  components: {TagComponent, ArticleInfo},
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      this.activeIndex = key;
    }
  },
  created() {}
};
</script>

<style lang="scss">
.home-article-page {
  width: 1000px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 5px #ddd;
  .top-title {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
