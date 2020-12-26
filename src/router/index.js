import Vue from "vue";
import VueRouter from "vue-router";
import homePage from "../views/homePages/homePage";
import diary from "../views/homePages/diary.vue";
import addToday from "../views/homePages/addToday";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: homePage
  },
  {
    path: "/diary",
    name: "diary",
    component: diary
  },
  {
    path: "/addToday",
    name: "addToday",
    component: addToday
  }
];

const router = new VueRouter({
  routes
});
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
