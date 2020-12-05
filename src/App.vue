<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <h1 v-if="isLoading">正在加载中😄</h1>
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
import { useStore } from "vuex";
import { defineComponent, reactive, ref, computed } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading )
    return {
      isLoading,
      user,
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
