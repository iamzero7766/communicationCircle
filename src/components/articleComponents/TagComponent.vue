<template>
  <div class="tag-component-style">
    <el-tag class="tag-style"
            v-for="item in tagList"
            :key="item.tag_id"
            @click="showTagArticle(item.value)"
    >{{ item.value }}</el-tag>
  </div>
</template>

<script>
export default {
  name: "TagComponent",
  data() {
    return {
      tagList: []
    };
  },
  methods: {
    getTagList() {
      var url = window.requestUrl + "tag/query";
      this.$post(url, {}).then(res => {
        this.tagList = res.info;
      });
    },

    showTagArticle(value) {
      console.log(value);
    }
  },
  created() {
    this.getTagList();
  }
};
</script>

<style lang="scss">
.tag-component-style {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 15px;
  .tag-style {
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
  }
}
</style>
