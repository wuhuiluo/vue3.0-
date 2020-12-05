<template>
  <div class="post-list">
    <article v-for="post in list" :key="post.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div class="col-3" v-if="post.image.url">
            <img src="http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg" :alt="post.title" class="rounded-lg w-100" />
          </div>
          <p :class="{ 'col-9': post.image.url }">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>


<script lang="ts">
import { PostProps } from "../store";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
});
</script>


<style>
</style>
