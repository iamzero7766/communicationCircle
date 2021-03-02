import Vue from "vue";
import store from "../store/index.js";
import VueRouter from "vue-router";
import bus from "@/utils/bus.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/loginPage",
    name: "loginPage",
    component: resolve => require(["../views/loginPage"], resolve)
  },
  {
    path: "/registerPage",
    name: "registerPage",
    component: resolve => require(["../views/registerPage"], resolve)
  },
  {
    path: "/",
    name: "loginPage",
    component: resolve => require(["../views/loginPage"], resolve)
  },
  {
    path: "/homePage",
    name: "homePage",
    component: resolve => require(["../views/homePages/homePage"], resolve)
  },
  {
    path: "/diary",
    name: "diary",
    component: resolve => require(["../views/homePages/diary.vue"], resolve)
  },
  {
    path: "/addToday",
    name: "addToday",
    component: resolve => require(["../views/homePages/addToday"], resolve)
  },
  {
    path: "/questionInfo",
    name: "questionInfo",
    component: resolve => require(["../views/homePages/questionInfo"], resolve)
  },
  {
    path: "/userInfo",
    name: "userInfo",
    component: resolve => require(["../views/userPages/UserInfo"], resolve)
  },
  {
    path: "/myHomepage",
    name: "myHomepage",
    component: resolve => require(["../views/userPages/MyHomepage"], resolve)
  },
  {
    path: "/articlePage",
    name: "articlePage",
    component: resolve => require(["../views/homePages/articlePage"], resolve)
  },
  {
    path: "/showArticlePage",
    name: "showArticlePage",
    component: resolve => require(["../views/homePages/showArticlePage"], resolve)
  },
  {
    path: "/homeArticle",
    name: "homeArticle",
    component: resolve => require(["../views/homePages/homeArticle"], resolve)
  }
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  localStorage.getItem("messageStore") && store.replaceState(Object.assign(store.state,JSON.parse(localStorage.getItem("messageStore"))));
  if (to.path === "/registerPage") {
    var loginData = {
      isLogin: false,
      userId: "",
      userName: ""
    };
    store.commit("setLoginData", loginData);
    localStorage.removeItem("messageStore");
    next();
  } else if(to.path === "/loginPage" || to.path == "/") {
    if(store.state.loginData.isLogin) {
      next( {name: "homePage"} );
    } else {
      next()
    }
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
