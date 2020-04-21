<template>
  <div class="about-wrapper">
    <h1>{{ title }}</h1>

    <NuxtLink to="/">Return Home Page</NuxtLink>
    <hr />
    <pre>{{ userAgent }}</pre>
    <hr />
    <ul>
      <li v-for="(visitItem, index) of visits" :key="index">
        {{ visitItem.path }} - {{ visitItem.date }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'dark',
  asyncData(context) {
    return new Promise((resolve) => {
      setTimeout(function() {
        resolve({ title: 'About Page', userAgent: context.userAgent })
      }, 1000)
    })
  },
  computed: {
    visits() {
      return this.$store.state.visits
    }
  }
}
</script>

<style scoped>
.about-wrapper {
  margin: 30px auto;
  text-align: center;
}
</style>
