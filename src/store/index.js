import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginData: {
      isLogin: false,
      userId: "",
      userName: "",
      userInfo: ""
    },
    avatar: ""
  },
  getters: {
    getLoginData: state => state.loginData
  },
  mutations: {

    // set方法
    setLoginData(state, loginData) {
      state.loginData = loginData;
    },
    setAvatar(state, string) {
      state.avatar = string;
    }

  },
  actions: {},
  modules: {}
});
