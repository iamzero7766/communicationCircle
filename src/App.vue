<template>
  <div id="app">
    <app-header></app-header>
    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
export default {
  components: {
    AppHeader
  }
};
</script>
<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .router-view {
    margin-top: 20px;
  }
}
</style>
