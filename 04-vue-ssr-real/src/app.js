// 通用 entry(universal entry)

import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router'
import createVuex from './store';

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
    // 创建 router 实例
    const router = createRouter();
    const store = createVuex();
    
    const app = new Vue({
        // 注入 router 到根 Vue 实例
        router,
        store,
        render: (h) => h(App)
    });
    return { app, router, store }
}