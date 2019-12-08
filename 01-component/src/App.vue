<template>
  <div id="app">
    <ul class="tab">
      <li>
        <router-link :to="{path: '/shopping-car'}">购物车</router-link>
      </li>
      <li>
        <router-link :to="{path: '/formvalid'}">表单校验</router-link>
      </li>
      <li>
        <router-link :to="{path: '/formvalid-custom'}">表单校验-模仿UI库-自定义</router-link>
      </li> 
      <li>
        <router-link :to="{ path: '/search' }">搜索列表</router-link>
      </li> 
      <li>
        <router-link :to="{ path: '/testvuex' }">Vuex测试</router-link>
      </li> 
    </ul>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
.tab {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.tab > li {
  float: left;
}

.tab > li > a {
  display: block;
  color: black;
  text-decoration: none;
  padding: 8px;
  background-color: aliceblue;
  border: 1px solid #f4f4f4;
}

.tab > li > .router-link-active {
  color: red;
  background: #fff;
}
</style>
