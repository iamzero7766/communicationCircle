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
        </el-menu>
      </div>
      <div class="content-part">
        <recommand-content v-show="activeIndex == '1'"></recommand-content>
        <follow-content v-show="activeIndex == '2'"></follow-content>
      </div>
    </div>
    <div class="info-view">
      <personal-component></personal-component>
      <attention-info></attention-info>
    </div>
  </div>
</template>

<script>
import PersonalComponent from "../../components/homeComponents/PersonalComponent.vue";
import RecommandContent from "../../components/homeComponents/RecommandContent.vue";
import FollowContent from "../../components/homeComponents/FollowContent";
import AttentionInfo from "../../components/AttentionInfo";
export default {
  components: {AttentionInfo, FollowContent, RecommandContent, PersonalComponent },
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
  min-height: 800px;
  .list-view {
    width: 690px;
    border: 1px solid #ddd;
    float: left;
    box-shadow: 0 0 5px #ddd;
    .top-title {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
    }
    .content-part {
      width: 100%;
      min-height: 100px;
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
  }
}
</style>
