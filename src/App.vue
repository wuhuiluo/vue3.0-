<template>
  <div class="container">
    <loading v-if="isLoading" text="努力加载中"></loading>
    <global-header :user="user"></global-header>
    <uploader
      :beforeUpload="beforeUpload"
      @upload-success="uploadSuccess"
      @upload-error="uploadError"
      action="/2api/api/upload"
    ></uploader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { ResponseType, ImageProps } from "./store";
import uploader from "./components/UpLoader.vue";
import createMessage from "./hooks/createMessage";
import Loading from "./components/Loading.vue";
import { useStore } from "vuex";
import {
  defineComponent,
  reactive,
  ref,
  computed,
  onMounted,
  watch,
} from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loading,
    uploader,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const token = computed(() => store.state.token);
    const error = computed(() => store.state.error);
    console.log(token.value);
    console.log(user.value);
    console.log(error.value);
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    const beforeUpload = (file: File) => {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        createMessage("不是jpg格式的", "error");
      }
      return isJPG;
    };
    const uploadSuccess = (rawData: ResponseType<ImageProps>) => {
      // console.log(rawData);
      createMessage(`该文件的ID${rawData.data._id}`, "success");
    };
    const uploadError = (rawData: any) => {
      console.log(rawData);
    }
    return {
      isLoading,
      user,
      error,
      beforeUpload,
      uploadSuccess,
      uploadError
    };
  },
});
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
</style>
