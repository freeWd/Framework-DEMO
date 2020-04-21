<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      页面没有找到
    </h1>
    <h1 v-else>
      一个错误发生了
    </h1>
    <NuxtLink to="/">
      去首页
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.container {
  font-family: sans-serif;
  padding-top: 10%;
  text-align: center;
}
h1 {
  font-size: 20px;
}
</style>
