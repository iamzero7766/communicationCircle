import Vue from "vue";
import VueRouter from "vue-router";
import homePage from "../views/homePages/homePage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: homePage
  }
];

const router = new VueRouter({
  routes
});

export default router;
