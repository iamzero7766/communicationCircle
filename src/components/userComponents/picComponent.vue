<template>
  <div class="pic-component-style">
    <el-carousel trigger="click" height="160px">
      <el-carousel-item v-for="item in picList" :key="item.id">
        <el-image :src="item.path" class="image-pic-style"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "picComponent",
  data() {
    return {
      picList: [
        { path: window.requestUrl + "back111.jpeg", id: 1 },
        { path: window.requestUrl + "back1112.jpeg", id: 2 },
        { path: window.requestUrl + "back113.jpeg", id: 3 },
        { path: window.requestUrl + "back114.jpeg", id: 4 },
      ]
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss">
.pic-component-style {
  width: 100%;
  height: 100%;
  .image-pic-style {
    width: 100%;
    height: 100%;
  }
} 
</style>
