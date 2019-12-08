import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

// 全局路由守卫
// 每次跳转进下一个路由之前触发
router.beforeEach((to, from, next) => {
  console.log('beforeEach---->', to, from);
  next();
})

// 路由被解析的时候触发
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve---->', to, from);
  next();
})

// 路由跳转之后触发
router.afterEach((to, from ) => {
  console.log('afterEach---->', to, from);
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
