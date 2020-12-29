<template>
  <div id="app">
    <app-header v-if="isLogin"></app-header>
    <div :class="[isLogin ? 'router-view' : 'login-router']">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
export default {
  components: {
    AppHeader
  },

  data() {
    return {
      isLogin: false,
    }
  },

  created() {
    console.log(this.$store.state.loginData);
  }
};
</script>
<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  .router-view {
    margin-top: 20px;
  }
  .login-router {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
