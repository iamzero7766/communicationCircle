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
        { name: "回答问题", path: "", image: "answer", key: 1 },
        { name: "日志", path: "/diary", image: "book", key: 2 }
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
  height: 100px;
  display: flex;
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
