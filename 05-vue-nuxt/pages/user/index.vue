<template>
  <div>
    <h1>{{ title }}</h1>
    <hr />
    <ul>
      <li v-for="{ id, name } in userList" :key="id">
        <NuxtLink :to="'/user/' + id"> {{ id }} - {{ name }} </NuxtLink>
      </li>
    </ul>
    <hr />
    <div>
      <NuxtLink to="/">Return Home</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const userList = await $axios.$get('/user.json')
    return { userList }
  },
  data() {
    return {
      title: '用户列表'
    }
  },
  head() {
    return {
      title: '👤- 用户列表'
    }
  }
}
</script>
