import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./plugins/vue-jquery.js"
import "element-ui/lib/theme-chalk/index.css";
import VueAMap from "vue-amap";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '82cca0dd2ff1ab11607c23b215ecd644',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
