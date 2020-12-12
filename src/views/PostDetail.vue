<template>
  <div v-if="currentPost" class="post-detail-page w-690">
    <article class="mb-5 pb-3">
      <img
        class="rounded-lg img-fluid my-4"
        v-if="currentImageUrl"
        :src="currentImageUrl"
        :alt="currentPost.title"
      />
      <h4 class="mb-4">{{ currentPost.title }}</h4>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div>
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          >
          </user-profile>
        </div>
        <span class="ml text-muted col text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
    </article>
  </div>
</template>


<script lang="ts">
import UserProfile from "../components/UserProfile.vue";
import { ColumnProps, GlobalDataProps, ImageProps, PostProps } from "../store";
import store from "../store";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { defineComponent, onMounted, computed } from "vue";
import MarkdownIt from "markdown-it";

export default defineComponent({
  components: { UserProfile },
  name: "PostDetail",
  setup() {
    const md = new MarkdownIt();
    // console.log(md);
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const route = useRoute();
    const currentId = route.params.id;
    // console.log(currentId);
    onMounted(() => {
      store.dispatch("fetchPost", currentId);
    });
    const currentPost = computed<PostProps>(() =>
      store.getters.getCurrentPost(currentId)
    );
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value;
        return (image as ImageProps).url + "?x-oss-process=image/resize,w_850";
      } else {
        return null;
      }
    });
    const currentHTML = computed(() => {
      const { isHTML, content } = currentPost.value;
      if (currentPost.value && content) {
        // console.log(isHTML);
        // console.log(content);
        // console.log(md.render(content));
        return isHTML ? content : md.render(content);
      }
    });
    // console.log(currentHTML.value);
    // console.log(currentPost);
    return {
      currentPost,
      currentImageUrl,
      UserProfile,
      currentHTML,
    };
  },
});
</script>


<style>
.w-690 {
  width: 690px;
  margin: 0 auto;
}
.ml {
  margin-left: 30px;
}
</style>
