<template>
  <div>
    <div v-if="label" style="margin-bottom: 12px">
      <label>{{ label }}</label>
    </div>
    <div style="margin-bottom: 12px">
      <slot></slot>
    </div>
    <p v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      error: null
    };
  },
  mounted() {
    this.$on("validate", this.validate);
  },
  methods: {
    validate() {
      const currentValue = this.$parent.model[this.prop];
      const currentRules = this.$parent.rules[this.prop];
      console.log(currentValue);

      // hardcode 以required为例
      let isValid = true;
      currentRules.forEach(ruleItem => {
        if (ruleItem.required) {
          isValid = currentValue !== "";
        }
      });
      if (!isValid) {
        this.error = "字段必填";
      }
    }
  }
};
</script>
