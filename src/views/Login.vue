<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <validate-input
        placeholder="请输入邮箱值"
        type="text"
        v-model="emailValue"
        :rules="emailRules"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">密码</label>
      <validate-input
        placeholder="请输入密码"
        type="password"
        v-model="passwordValue"
        :rules="passwordRules"
      ></validate-input>
    </div>

    <template #submit>
      <span class="btn btn-danger">Submit</span>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
export default defineComponent({
  name: "Login",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    console.log(router);
    const emailValue = ref("wuhuiluo");
    const passwordValue = ref("wuhuiluo1A");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const onFormSubmit = (result: boolean) => {
      // console.log("submitForm的返回结果:", result);
      if (result) {
        router.push("/");
        store.commit("login");
        console.log(store.state.user.isLogin);
        console.log(store.state.user.name);
        // router.push({name: 'column', params: {id: 1} })
      }
    };
    return {
      emailValue,
      passwordValue,
      passwordRules,
      emailRules,
      onFormSubmit,
    };
  },
});
</script>