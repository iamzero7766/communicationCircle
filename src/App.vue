<template>
  <div id="app">
    <app-header v-if="isLogin && isAdd"></app-header>
    <div :class="[isLogin && isAdd ? 'router-view' : 'login-router']">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import bus from "./utils/bus.js";
// import store from "./store/index.js";
export default {
  components: {
    AppHeader
  },

  data() {
    return {
      isAdd: true
    };
  },

  computed: {
    isLogin() {
      return this.$store.state.loginData.isLogin;
    }
  },
  mounted() {
    bus.$on("addArticle", state => {
      this.isAdd = state;
    });

    window.addEventListener("beforeunload",()=>{

      localStorage.setItem("messageStore", JSON.stringify(this.$store.state));

    });
    // window.addEventListener("unload",()=>{
    //   localStorage.removeItem("messageStore");
    // });
    // window.addEventListener("load",()=>{
    //   localStorage.setItem("messageStore", JSON.stringify(this.$store.state));
    // });
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));


  },

  watch: {
    store(loginInfo) {
      console.log(loginInfo);
    }
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
  position: absolute;
  top: 0;
  .router-view {
    margin-top: 70px;
  }
  .login-router {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .left-back {
    float: left;
    width: 400px;
    height: 100%;
  }
  .app-back {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
