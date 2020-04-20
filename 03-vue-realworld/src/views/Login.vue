<template>
  <div class="login">
    <h1 style="margin-bottom: 20px;">登录页面</h1>
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler"
      @reset="resetHandler"
    ></cube-form>
    <cube-popup :mask="false" ref="msgPopup" position="top">
      {{ errMsg }}
    </cube-popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errMsg: null,
      validity: {},
      valid: undefined,
      model: {
        userName: "",
        password: ""
      },
      schema: {
        groups: [
          {
            legend: "测试登录API",
            fields: [
              {
                type: "input",
                modelKey: "userName",
                label: "用户名",
                props: {
                  placeholder: "请输入"
                },
                rules: {
                  required: true
                },
                messages: {
                  required: "用户名必填"
                },
                trigger: "blur"
              },
              {
                type: "input",
                modelKey: "password",
                label: "密码",
                props: {
                  type: "password",
                  placeholder: "请输入"
                },
                rules: {
                  required: true
                },
                messages: {
                  required: "密码必填"
                },
                trigger: "blur"
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                label: "Submit"
              },
              {
                type: "reset",
                label: "Reset"
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      }
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    submitHandler(e) {
      e.preventDefault();
      this["login"](this.model).then(callBack => {
        if (callBack.status == 1) {
          this.$router.push("/about");
        } else {
          this.errMsg = callBack.msg;
          this.showPopup("msgPopup");
        }
      });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    resetHandler(e) {
      console.log("reset", e);
    },
    showPopup(refId) {
      const component = this.$refs[refId];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 1000);
    }
  }
};
</script>
