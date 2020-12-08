<template>
  <div class="file upload">
    <button @click="triggerUpload" class="btn btn-primary">
      <span v-if="fileStatus === 'loading'">文件上传中</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else>点击上传</span>
    </button>
    <input
      @change="handleFileChange"
      type="file"
      class="file-input d-none"
      ref="fileInput"
    />
  </div>
</template>


<script lang="ts">
import axios from "axios";
import { defineComponent, PropType, ref } from "vue";
type CheckFunction = (file: File) => boolean;
type UploadStatus = "ready" | "loading" | "success" | "error";
export default defineComponent({
  name: "uploader",
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  emits: ["upload-success", "upload-error"],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const triggerUpload = () => {
      if (fileInput.value) {
        // console.log(fileInput.value);
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          console.log(result);
          if (!result) {
            return;
          }
        }
        fileStatus.value = "loading";
        // console.log(files);
        const formData = new FormData();
        formData.append("file", files[0]);
        axios
          .post(props.action, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            fileStatus.value = "success";
            context.emit("upload-success", res.data);
          })
          .catch((error) => {
            // console.log(e.data.message);
            fileStatus.value = "error";
            context.emit("upload-error", error)
          })
          .finally(() => {
            if (fileInput.value) {
              //   console.log(fileInput.value.value);
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
    };
  },
});
</script>


<style>
</style>
