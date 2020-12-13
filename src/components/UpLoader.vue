<template>
  <div class="file-upload">
    <div v-bind="$attrs" @click="triggerUpload" class="file-upload-container">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary">正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploaded"
        :uploadFile="uploadFile"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      @change="handleFileChange"
      type="file"
      class="file-input d-none"
      ref="fileInput"
    />
  </div>
</template>


<script lang="ts">
import { watch } from "vue";
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
    uploaded: {
      type: Object,
    },
  },
  inheritAttrs: false,
  emits: ["upload-success", "upload-error"],
  setup(props, context) {
    console.log(props.uploaded);
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>(props.uploaded ? "success" : "ready");
    const uploadFile = ref(props.uploaded)
    watch(() => props.uploaded , (newValue) => {
      if(newValue) {
        fileStatus.value = 'success',
        uploadFile.value = newValue
      }
    })
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
          console.log(result); // 判断是不是上传对了文件 1mb jpg/png
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
            // console.log(res);
            uploadFile.value = res.data;
            fileStatus.value = "success";
            context.emit("upload-success", res.data);
          })
          .catch((error) => {
            // console.log(e.data.message);
            fileStatus.value = "error";
            context.emit("upload-error", "上传文件错误");
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
      uploadFile,
    };
  },
});
</script>


<style>
</style>
