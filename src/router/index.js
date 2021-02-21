import Vue from "vue";
import store from "../store/index.js";
import VueRouter from "vue-router";
import homePage from "../views/homePages/homePage";
import diary from "../views/homePages/diary.vue";
import addToday from "../views/homePages/addToday";
import loginPage from "../views/loginPage";
import questionInfo from "../views/homePages/questionInfo";
import UserInfo from "../views/userPages/UserInfo";
import MyHomepage from "../views/userPages/MyHomepage";
import articlePage from "../views/homePages/articlePage";
import showArticlePage from "../views/homePages/showArticlePage";
import homeArticle from "../views/homePages/homeArticle";
import bus from "@/utils/bus.js";
import registerPage from "../views/registerPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/loginPage",
    name: "loginPage",
    component: loginPage
  },
  {
    path: "/registerPage",
    name: "registerPage",
    component: registerPage
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
  },
  {
    path: "/userInfo",
    name: "userInfo",
    component: UserInfo
  },
  {
    path: "/myHomepage",
    name: "myHomepage",
    component: MyHomepage
  },
  {
    path: "/articlePage",
    name: "articlePage",
    component: articlePage
  },
  {
    path: "/showArticlePage",
    name: "showArticlePage",
    component: showArticlePage
  },
  {
    path: "/homeArticle",
    name: "homeArticle",
    component: homeArticle
  }
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  if (to.path === "/loginPage" || to.path === "/registerPage") {
    var loginData = {
      isLogin: false,
      userId: "",
      userName: ""
    };
    store.commit("setLoginData", loginData);
    next();
  } else {
    if (store.state.loginData.isLogin) {
      next();
    } else {
      next( {name: "loginPage"} )
    }
  }
  if(to.path === "/articlePage") {
    bus.$emit("addArticle", false);
  } else {
    bus.$emit("addArticle", true);
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
