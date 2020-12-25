<template>
  <div class="diary-class">
    <div class="top-box">
      <div v-for="item in titleList" :key="item.key" class="top-part-box">
        <div class="title-style">{{ item.name }}</div>
        <div class="value-style">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "diary",
  components: {},
  data() {
    return {
      titleList: [
        { name: "日", key: 1, value: "SUN" },
        { name: "一", key: 2, value: "MON" },
        { name: "二", key: 3, value: "TUE" },
        { name: "三", key: 4, value: "WED" },
        { name: "四", key: 5, value: "THUR" },
        { name: "五", key: 6, value: "FRI" },
        { name: "六", key: 7, value: "SAT" }
      ]
    };
  }
};
</script>

<style lang="scss">
.diary-class {
  width: 1000px;
  margin: 20px auto;
  .top-box {
    width: 100%;
    display: flex;
    height: 130px;
    border-top: 2px solid #b22222;
    border-bottom: 2px solid #b22222;
    border-right: 2px solid #b22222;
  }
  .top-part-box {
    flex: 1;
    height: 130px;
    box-sizing: border-box;
    border-left: 2px solid #b22222;
    background: rgba($color: #bc8f8f, $alpha: 1);
    text-align: center;
    .title-style {
      font-size: 24px;
      color: #fff;
      font-weight: 600;
      margin-top: 35px;
    }
    .value-style {
      font-size: 14px;
      color: #fff;
      font-weight: 300;
    }
  }
}
</style>
