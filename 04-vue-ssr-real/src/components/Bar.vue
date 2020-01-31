<template>
  <div>
    hello this is <strong>Bar</strong> vue page
    <h1>my name is {{ getUserName }}</h1>
    <button @click="changeNameAsync">change name</button>
    hmr
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  metaInfo: {
    title: "Bar Page"
  },
  // 写的代码都是异步的，全部采用promsie
  // 规定只有页面级的组件才能使用
//   asyncData({ store }) {
//     // 异步数据 这个方法在服务端执行，在客户端是不会执行的
//     const newValue = "new demo name async";
//     return store.dispatch("set_username", newValue);
//   },
  mounted() {
    const newValue = "new demo name";
    this.$store.dispatch("set_username", newValue);
  },
  computed: {
    ...mapGetters(["getUserName"])
  },
  methods: {
    show() {
      alert(1);
    },
    ...mapActions(["set_username"]),
    changeNameAsync() {
      console.log('xxx');
      this["set_username"]("click async demo name").then(msg => {
        console.log(msg);
      });
    }
  }
};
</script>
