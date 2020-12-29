<template>
  <div class="login-page-style">
    <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#FFFFFF"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="cash login-box"
    >
    </vue-particles>
  </div>
</template>

<script>
export default {
  name: "loginPage"
};
</script>

<style lang="scss">
.login-page-style {
  width: 100%;
  height: 100%;
  background: cornflowerblue;
  /*.login-box {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: cornflowerblue;*/
  /*}*/
}
</style>
