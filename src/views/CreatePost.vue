<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题: </label>
        <validate-input
          :rules="titleRules"
          v-model="titleValue"
          placeholder="请输入文章标题"
          type="text"
        >
        </validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情: </label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentValue"
        ></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>


<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { PostProps } from "../store";
import { GlobalDataProps } from "../store";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
export default defineComponent({
  name: "CreatePost",
  setup() {
    const titleRules: RulesProp = [
      {
        type: "required",
        message: "文章标题不能为空",
      },
    ];
    const titleValue = ref("");
    const contentRules: RulesProp = [
      { type: "required", message: "文章详情不能为空" },
    ];
    const contentValue = ref("");
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user;
        if (columnId) {
          // const post: PostProps = {
          //   _id: new Date().getTime(),
          //   title: titleValue.value,
          //   content: contentValue.value,
          //   columnId,
          //   createAt: new Date().toLocaleString(),
          // };
          // store.commit("createPost", post);
          // router.push({ name: "column", params: { id: columnId } });
        }
      }
    };
    return {
      titleRules,
      contentRules,
      contentValue,
      titleValue,
      onFormSubmit,
    };
  },
  components: {
    ValidateInput,
    ValidateForm,
  },
});
</script>


<style>
</style>
