<template>
  <div class="home-page-style">
    <div class="list-view">
      <div class="top-title"></div>
    </div>
    <div class="info-view">121212</div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
      titleList: []
    }
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss">
  .home-page-style {
    width: 1000px;
    margin: 0 auto;
    .list-view {
      width: 690px;
      border: 1px solid #ddd;
      float: left;
      background-color: #fff;
      .top-title {
        width: 100%;
        height: 60px;
      }
    }
    .info-view {
      width: 280px;
      float: left;
      margin-left: 10px;
      background-color: #fff;
    }
  }
</style>
