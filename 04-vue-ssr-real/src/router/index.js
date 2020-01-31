import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// 改为这样：
// import Bar from '../components/Bar.vue';
// import Foo from '../components/Foo.vue';

Vue.use(Router);
Vue.use(Meta);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('../components/Bar.vue') },
      { path: '/foo', component: () => import('../components/Foo.vue') }
        // { path: '/', component: Bar },
        // { path: '/foo', component: Foo },
    ]
  })
}