// 仅运行于浏览器
import { createApp } from "./app";

const { app, router } = createApp();

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
  app.$mount("#app");
});
