<template>
  <div>
    <h1>测试vuex</h1>
    <p>名字：{{ $store.state.name }}</p>
    <p>Get 名字：{{ $store.getters.getName }}</p>
    <input type="text" v-model="currentName" />
    <button @click="changeName">改名字</button>
    <button @click="changeASyncName">异步改名字</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      currentName: ""
    };
  },
  mounted() {
    this.currentName = this.name;
  },
  computed: {
    ...mapState(["name", "desc"]),
    ...mapGetters(["getName"])
  },
  methods: {
    ...mapMutations(["change_name"]),
    changeName() {
      this["change_name"](this.currentName);
    },
    ...mapActions(["change_async_name"]),
    changeASyncName() {
      this["change_async_name"](this.currentName);
    }
  }
};
</script>
