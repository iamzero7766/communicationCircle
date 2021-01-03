import Vue from "vue";
import store from "../store/index.js";
import VueRouter from "vue-router";
import homePage from "../views/homePages/homePage";
import diary from "../views/homePages/diary.vue";
import addToday from "../views/homePages/addToday";
import loginPage from "../views/loginPage";
import questionInfo from "../views/homePages/questionInfo";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "loginPage",
    component: loginPage
  },
  {
    path: "/",
    name: "loginPage",
    component: loginPage
  },
  {
    path: "/homePage",
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
  },
  {
    path: "/questionInfo",
    name: "questionInfo",
    component: questionInfo
  }
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  if(to.path === "/login") {
    var loginData = {
      isLogin: false,
      userId: "",
      userName: "",
    };
    store.commit('setLoginData', loginData);
    next()
  } else {
    if(store.state.loginData.isLogin) {
      next()
    } else {
      next( {name: "loginPage"} )
    }
  }
  next();
});
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
