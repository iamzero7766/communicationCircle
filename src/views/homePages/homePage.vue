<template>
  <div class="home-page-style">
    <div class="list-view">
      <div class="top-title">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">推荐</el-menu-item>
          <el-menu-item index="2">关注</el-menu-item>
          <el-menu-item index="3">热榜</el-menu-item>
        </el-menu>
      </div>
      <div class="content-part">
        <recommand-content v-show="activeIndex == '1'"></recommand-content>
      </div>
    </div>
    <div class="info-view">
      <personal-component></personal-component>
    </div>
  </div>
</template>

<script>
import PersonalComponent from "../../components/homeComponents/PersonalComponent.vue";
import RecommandContent from "../../components/homeComponents/RecommandContent.vue";
export default {
  components: { RecommandContent, PersonalComponent },
  name: "homePage",
  data() {
    return {
      activeIndex: "1",
      titleList: []
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
      border-bottom: 1px solid #ddd;
    }
    .content-part {
      width: 100%;
      background-color: #fff;
    }
    .el-menu-item.is-active {
      border: 0;
      color: rgba(9, 51, 114, 0.712);
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: rgba(9, 51, 114, 0.712);
    }
    .el-menu-item {
      transition: 0ms;
    }
  }
  .info-view {
    width: 295px;
    float: left;
    margin-left: 10px;
    background-color: #fff;
  }
}
</style>
