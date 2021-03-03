import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueParticles from "vue-particles";
import VueX from "vuex";
import infiniteScroll from "vue-infinite-scroll";
import vueButtonEffect from "vue-button-effect";
import "./assets/requestUrl.js";
import { post, fetch } from './plugins/axios-http';

Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.use(VueX);
Vue.use(infiniteScroll);
Vue.use(vueButtonEffect);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
