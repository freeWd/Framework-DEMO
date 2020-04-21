<template>
  <div>
    <h1>用户详情</h1>
    <ul>
      <li>ID: {{ currentUser.id }}</li>
      <li>Name: {{ currentUser.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  // validate 方法 Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。
  // 如果校验方法返回的值不为 true， Nuxt.js 将自动加载显示 404 错误页面
  validate({ params }) {
    // Must be a number
    return /\d+/.test(parseInt(params.id))
  },
  async asyncData({ params, error, $axios }) {
    try {
      const userList = await $axios.$get('/user.json')
      const findUser = userList.find((item) => item.id === params.id)
      if (findUser) {
        return { currentUser: findUser }
      } else {
        error({ message: 'User not found', statusCode: 404 })
      }
    } catch (e) {
      error({ message: 'User not found', statusCode: 404 })
    }
  }
}
</script>
