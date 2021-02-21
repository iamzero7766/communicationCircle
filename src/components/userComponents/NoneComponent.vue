<template>
  <div class="none-component-box">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "NoneComponent",
  data() {
    return {
      msg: "暂未开发"
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss">
.none-component-box {
  width: 600px;
  height: 800px;
  box-sizing: border-box;
  padding: 15px;
}
</style>
