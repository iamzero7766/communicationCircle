<template>
  <div class="anonyous-component-style">
    <div class="user-info-box-component">
      <div class="avator-class">
        <el-avatar
          :size="60"
          shape="square"
          :src="avatorSrc"
          fit="contain"
        ></el-avatar>
      </div>
      <div class="item-text-class">
        匿名用户
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnonymosUser",
  data() {
    return {
      avatorSrc: window.requestUrl + "avatar.jpg"
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss">
.anonyous-component-style {
  width: 360px;
  background: #fff;
  box-shadow: 0 0 5px #ddd;
  .user-info-box-component {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 10px 15px;
    border-bottom: 1px solid #f3f3f3;
    .avator-class {
      float: left;
    }
    .item-text-class {
      float: left;
      margin-left: 15px;
      line-height: 60px;
      font-size: 16px;
    }
  }
}
</style>
