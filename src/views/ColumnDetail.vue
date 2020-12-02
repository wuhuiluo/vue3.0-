<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items center">
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          class="rounded-circle border"
          :alt="column.title"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="post"></post-list>
  </div>
</template>


<script lang="ts">
import PostList from "../components/PostList.vue";
import { testData, testPosts } from "../hooks/testData";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: { PostList },
  setup() {
    const route = useRoute();
    const currentId = +route.params.id;
    const column = testData.find((column) => column.id === currentId);
    const post = testPosts.filter((post) => post.columnId === currentId);
    console.log(post);
    console.log(column);
    return {
      column,
      post,
      route,
    };
    components: {
      PostList;
    }
  },
});
</script>


<style>
</style>
