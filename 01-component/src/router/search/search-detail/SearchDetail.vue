<template>
  <div>
    <h1>列表详情页</h1>
    列表的ID：{{ id }}
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      // id: ""
    };
  },
  mounted() {
    // this.id = this.$route.params.id;
  },
  // 路由进入之前的钩子
  beforeRouteEnter(to, from, next) {
    // 组件实例没有创建，不能获取实例 this
    next(vm => {
      // vm相当于this
      console.log("beforeRouteEnter----->", vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRoutedUpdate---->", to, next);
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave---->", to);
    if (window.confirm("是否确认离开")) {
      next();
    } else {
      next(false);
    }
  }
};
</script>
