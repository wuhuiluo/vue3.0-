<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img :src="post.image && post.image.fitUrl" :alt="post.title" class="rounded-lg w-100" />
          </div>
          <p :class="{ 'col-9': post.image }">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>


<script lang="ts">
import { generateFitUrl } from '../hooks/help'
import { PostProps,ImageProps } from "../store";
import { defineComponent, PropType,computed } from "vue";

export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
  setup(props) {
      const posts = computed(() => {
          return props.list.map(post => {
            generateFitUrl(post.image as ImageProps,200,110,['m_fill'] )
            return post
          })
      })
      // console.log(posts);
      return {
        posts
      }
  }
});
</script>


<style>
</style>
