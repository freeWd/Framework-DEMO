<template>
  <div>
    <h1>这是搜索列表</h1>
    <ul>
      <li v-for="item in list" :key="item.id">
        <a @click="gotoDetail(item)">{{ item.content }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { content: "content1", id: "1" },
        { content: "content2", id: "2" },
        { content: "content3", id: "3" },
        { content: "content4", id: "4" },
        { content: "content5", id: "5" }
      ]
    };
  },
  methods: {
    gotoDetail(item) {
        this.$router.push({ name: 'search-detail', params: { id: item.id }});
    }
  }
};
</script>
