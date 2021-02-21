<template>
  <div class="personal-component-box">
    <div v-for="item in personalData" :key="item.key" class="image-box">
      <div style="cursor: pointer" @click="routerChange(item.path)">
        <div
          class="image-style"
          :style="
            'background-image:url(' +
              require('../../assets/personal/' + item.image + '.png') +
              ')'
          "
        ></div>
        <div class="txt-style">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalComponent",
  data() {
    return {
      personalData: [
        { name: "写文章", path: "/articlePage", image: "article", key: 2 },
        { name: "日志", path: "/diary", image: "diary", key: 3 }
      ]
    };
  },
  methods: {
    routerChange(path) {
      this.$router.push({
        path: path
      });
    }
  }
};
</script>

<style lang="scss">
.personal-component-box {
  width: 100%;
  height: 80px;
  display: flex;
  background: #fff;
  box-shadow: 0 0 5px #ddd;
  .image-box {
    flex: 1;
    text-align: center;
    box-sizing: border-box;
    padding-top: 15px;
  }
  .image-style {
    width: 36px;
    height: 30px;
    margin: 0 auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .txt-style {
    font-size: 14px;
    color: #1296db;
    margin-top: 10px;
  }
}
</style>
