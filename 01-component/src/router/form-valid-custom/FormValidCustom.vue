<template>
  <div>
    <Form ref="testForm" :model="testForm" :rules="rules">
      <FormItem label="内容消息" prop="message">
        <Input type="text" v-model="testForm.message" />
      </FormItem>
      <button @click="submit('testForm')">提交表单</button>
      <button @click="reset('testForm')">重置表单</button>
    </Form>
  </div>
</template>

<script>
import Form from "./components/Form";
import FormItem from "./components/FormItem";
import Input from './components/Input';

export default {
  components: {
      Form, 
      FormItem,
      Input
  },
  data() {
    return {
      testForm: {
        message: ""
      },
      rules: {
        message: [{ required: true, message: "请输入邮箱" }]
      }
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate();
    },
    reset(formName) {
      console.log(this.$refs[formName]);
    }
  }
};
</script>
