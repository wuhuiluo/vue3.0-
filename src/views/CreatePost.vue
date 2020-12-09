<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      :beforeUpload="checkValidate"
      @upload-success="successLoad"
      action="/api/api/upload"
      class="my-4 text-secondary w-100 d-flex align-items-center justify-content-center bg-light"
    >
            
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="uploadFile">
        <div class="d-flex">
          <img :src="uploadFile.uploadFile.data.url" />
          <!-- <h3>点击重新上传</h3> -->
        </div>
      </template>
          </uploader
    >
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
import axios from "axios";
import { beforeUploadCheck } from "../hooks/help";
import { ResponseType, ImageProps } from "../store";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { PostProps } from "../store";
import { GlobalDataProps } from "../store";
import uploader from "../components/UpLoader.vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import createMessage from "@/hooks/createMessage";
export default defineComponent({
  name: "CreatePost",
  setup() {
    let imageId = "";
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
        const { column, _id } = store.state.user;
        if (column) {
          const post: PostProps = {
            title: titleValue.value,
            content: contentValue.value,
            column,
            author: _id,
          };
          if (imageId) {
            post.image = imageId;
          }
          store.dispatch("createPost", post).then((res) => {
            setTimeout(() => {
              console.log();
              router.push({ name: "column", params: { id: column } });
            }, 2000);
          });
          // store.commit("createPost", post);
          // router.push({ name: "column", params: { id: columnId } });
        }
      }
    };
    const successLoad = (result: ResponseType<ImageProps>) => {
      console.log(result);
      if (result.data._id) {
        imageId = result.data._id;
      }
      createMessage("上传成功", "success");
    };
    const checkValidate = (file: File) => {
      const result = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      const { passed, error } = result;
      if (error === "format") {
        createMessage("上传图片只能是 JPG/PNG 格式", "error");
      }
      if (error === "size") {
        createMessage("上传大小不能超过 1MB", "error");
      }
      return passed;
    };
    // const handleFileChange = (e: Event) => {
    //   const target = e.target as HTMLInputElement;
    //   const files = target.files;
    //   if (files) {
    //     const uploadedFile = files[0];
    //     const formData = new FormData();
    //     formData.append(uploadedFile.name, uploadedFile);
    //     console.log(formData);
    //     axios
    //       .post("/api/api/upload", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((res) => {
    //         console.log(res);
    //       });
    //   }
    // };

    return {
      titleRules,
      contentRules,
      contentValue,
      titleValue,
      onFormSubmit,
      successLoad,
      checkValidate,
    };
  },
  components: {
    ValidateInput,
    ValidateForm,
    uploader,
  },
});
</script>


<style>
.create-post-page .file-upload-container {
  height: 300px;
  cursor: pointer;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 300px;
}
</style>
