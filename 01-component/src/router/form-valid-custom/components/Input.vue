<template>
  <div>
    <input :type="type" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      defalut: ""
    },
    type: {
      type: String,
      defalut: "text"
    }
  },
  methods: {
    onInput(e) {
      let inputValue = e.target.value;
      this.$emit("input", inputValue);
      this.$parent.$emit("validate");
    }
  }
};
</script>
