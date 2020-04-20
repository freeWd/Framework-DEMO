<template>
  <div class="container">
    <div class="app-wrap">
      <div class="template-tabs">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <nuxt-link to="/">首页</nuxt-link>
            </span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <nuxt-link to="/child/123">用户</nuxt-link>
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="content-wrap">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<style>
.app-wrap {
  flex: 1;
  padding: 10px 20px;
  overflow: auto;
}

.content-wrap {
  height: 90%;
  border: 1px solid #d1dbe5;
  border-top: none;
  padding: 0 20px;
}
</style>
