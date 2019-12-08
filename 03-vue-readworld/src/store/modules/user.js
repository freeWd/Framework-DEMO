import userService from "../../service/user";

export default {
  namespaced: true,
  state: {
    isLogin: localStorage.getItem("token") ? true : false
  },
  mutations: {
    setLoginState(state, payload) {
      state.isLogin = payload;
    }
  },
  actions: {
    login({ commit }, payload) {
      return userService.login(payload).then(data => {
        if (data.status === 1) {
          localStorage.setItem("user-token", data.token);
          commit("setLoginState", true);
        }
        return data;
      });
    },
    verify({ commit }) {
      return userService.verify().then(data => {
        if (data.status === 1) {
          localStorage.setItem("user-token", data.token);
          commit("setLoginState", true);
        }
        return data.status === 1;
      });
    },
    logout({ commit }) {
      localStorage.removeItem("user-token");
      commit("setLoginState", false);
    }
  }
};
