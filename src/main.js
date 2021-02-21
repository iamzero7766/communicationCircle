import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "./plugins/vue-jquery.js";
import "element-ui/lib/theme-chalk/index.css";
import VueAMap from "vue-amap";
import VueParticles from "vue-particles";
import VueX from "vuex";
import infiniteScroll from "vue-infinite-scroll";
import vueButtonEffect from "vue-button-effect";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.use(VueParticles);
Vue.use(VueX);
Vue.use(infiniteScroll);
Vue.use(vueButtonEffect)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
