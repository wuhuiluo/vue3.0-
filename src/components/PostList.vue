<template>
    <div class="post-list">
        <article v-for="post in list" :key="post.id" class="card mb-3 shadow-sm">
            <div class="card-body">
                <h4>{{ post.title }}</h4>
                <div class="row my-3 align-items-center">
                    <div class="col-3" v-if="post.image">
                        <img :src="post.image" :alt="post.title" class="rounded-lg w-100"> 
                    </div>
                    <p :class="{'col-9': post.image}">{{ post.content }}</p>
                </div>
                <span class="text-muted">{{ post.createAt }}</span>
            </div>
        </article>
    </div>
</template>


<script lang="ts">
import { PostPros } from "../hooks/testData";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostPros[]>,
      required: true
    },
  },
});
</script>


<style>
</style>
