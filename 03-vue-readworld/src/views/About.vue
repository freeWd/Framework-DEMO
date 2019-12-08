<template>
  <div class="about">
    <h1 style="margin-bottom: 30px;">This is an about page</h1>
    <h1>这个页面只有登录才能查看</h1>

    <cube-button @click="signOut">退出</cube-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["logout"]),
    signOut() {
      this["logout"]().then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
