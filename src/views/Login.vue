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
import createMessage from "../hooks/createMessage";
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
    // console.log(router);
    const emailValue = ref("51042634@qq.com");
    const passwordValue = ref("123456");
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
        const payload = {
          email: emailValue.value,
          password: passwordValue.value,
        };
        store
          .dispatch("loginAndFetch", payload)
          .then((res) => {
            // console.log(res);
            createMessage("登陆成功 2秒后跳转到首页", "success");
            setTimeout(() => {
              router.push("/");
            });
          })
          .catch((e) => {
            console.log(e);
          });
        // store.commit("login");
        // console.log(store.state.user.isLogin);
        // console.log(store.state.user.name);
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