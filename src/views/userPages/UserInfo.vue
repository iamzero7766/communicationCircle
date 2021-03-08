<template>
  <div class="user-info-style">
    <el-menu class="menu-box" @select="selectMenu">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">基本信息</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">屏蔽设置</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">偏好设置</span>
      </el-menu-item>
    </el-menu>
    <div class="content-box">
      <basic-information v-show="activeNum == 1"></basic-information>
      <none-component v-show="activeNum != 1"></none-component>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  components: {
    NoneComponent: () => import("../../components/userComponents/NoneComponent"),
    BasicInformation: () => import("../../components/userComponents/BasicInformation")
  },
  data() {
    return {
      activeNum: 1
    };
  },
  methods: {
    selectMenu(index) {
      this.activeNum = index;
    }
  }
};
</script>

<style lang="scss">
.user-info-style {
  width: 805px;
  margin: 0 auto;
  background: #fff;
  .menu-box {
    width: 200px;
    float: left;
    height: 800px;
  }
  .content-box {
    width: 600px;
    float: left;
    background: #fff;
  }
}
</style>
