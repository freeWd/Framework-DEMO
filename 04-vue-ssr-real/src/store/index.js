import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

export default () => {
  let store = new vuex.Store({
    state: {
      username: "demo"
    },
    getters: {
      getUserName(state) {
        return state.username + "!!~~";
      }
    },
    mutations: {
      set_username(state, payload) {
        state.username = payload;
      }
    },
    actions: {
      set_username({ commit }, payload) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit("set_username", payload);
            resolve('success');
          }, 1000);
        });
      }
    }
  });

  // vuex代码会在前端和后端都被执行，所以后端修改后的值，前端存储的还是旧的，需要替换一下
  if (typeof window !== "undefined" && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
};
