<template>
  <div class="container">
    <div>
      <logo />
      <p>{{ name }}</p>
      <ul>
        <li>
          <NuxtLink to="/about">
            Go to about page
          </NuxtLink>
        </li>
        <li>
          <span class="link" @click="goToUsrList">
            Go to User List page
          </span>
        </li>
        <li>
          <NuxtLink to="/todo">
            Go to todo-list page
          </NuxtLink>
        </li>
      </ul>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  asyncData() {
    return new Promise((resolve) => {
      setTimeout(function() {
        resolve({ name: 'Home Page' })
      }, 1000)
    })
  },
  methods: {
    goToUsrList() {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$router.push('/user')
      }, 1500)
    }
  },
  head() {
    return {
      title: '🚀-Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ],
      noscript: [{ innerHTML: 'Body No Scripts', body: true }]
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.link {
  cursor: pointer;
  text-decoration: underline;
}
</style>
