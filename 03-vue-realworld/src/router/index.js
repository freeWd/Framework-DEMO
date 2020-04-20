import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    meta: { needLogin: true },
    component: () => import("../views/About.vue"),
    beforeEnter: (to, from, next) => {
      if (to.meta.needLogin) {
        store.dispatch("user/verify").then(loginStatus => {
          if (loginStatus) {
            next();
          } else {
            next("/login");
          }
        });
      }
      next();
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
