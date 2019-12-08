<template>
  <div>
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
    props: {
        model: {
            type: Object,
            default: () => null
        },
        rules: {
            type: Object,
            default: () => null
        }
    },
    methods: {
        validate() {
            console.log(this.$children);
        },
        resetFields() {

        }
    }
};
</script>
