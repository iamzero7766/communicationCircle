<template>
  <div class="attention-info-component">
    <div class="text-attention">本网站提问内容均来自其他网站信息，如有侵权，请告知删除</div>
    <div class="text-attention">联系电话：13472723614</div>
    <div class="text-attention">联系邮箱：627731409@qq.com</div>
  </div>
</template>

<script>
export default {
  name: "AttentionInfo",
};
</script>

<style lang="scss">
.attention-info-component {
  width: 100%;
  margin-top: 25px;
  background: transparent;
  .text-attention {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    line-height: 25px;
    color: lightgray;
    font-size: 14px;
  }
}
</style>
