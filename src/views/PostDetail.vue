<template>
  <div v-if="currentPost" class="modify-height post-detail-page w-690">
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
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{ name: 'create', query: { id: currentPost._id } }"
          >编辑</router-link
        >
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="modalIsVisible = true"
        >
          删除
        </button>
      </div>
    </article>
    <modal
      v-if="modalIsVisible"
      title="删除文章"
      :isVisible="modalIsVisible"
      @modal-on-close="CloseModal"
      @modal-on-confirm="HideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
  </div>
</template>


<script lang="ts">
import Modal from "../components/Modal.vue";
import { UserProps } from "../store";
import UserProfile from "../components/UserProfile.vue";
import {
  ResponseType,
  ColumnProps,
  GlobalDataProps,
  ImageProps,
  PostProps,
} from "../store";
import store from "../store";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { defineComponent, onMounted, computed, ref } from "vue";
import MarkdownIt from "markdown-it";
import createMessage from "@/hooks/createMessage";

export default defineComponent({
  name: "PostDetail",
  components: {
    UserProfile,
    Modal,
  },
  setup() {
    const modalIsVisible = ref(false);
    const md = new MarkdownIt();
    const CloseModal = () => {
      modalIsVisible.value = false;
    };
    const HideAndDelete = () => {
      modalIsVisible.value = false;
      store
        .dispatch("deletePost", currentId)
        .then((res: ResponseType<PostProps>) => {
          createMessage('文章删除成功','success')
          setTimeout(() => {
              router.push({
                name: 'column',
                params: {
                  id: res.data.column
                }
              })
          },2000)
        });
    };
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
    // 判断文章的用户是否跟登陆用户一致
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user;
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps;
        return postAuthor._id === _id;
      } else {
        return false;
      }
    });
    // console.log(showEditArea.value);
    // console.log(currentHTML.value);
    // console.log(currentPost);
    return {
      modalIsVisible,
      showEditArea,
      currentPost,
      currentImageUrl,
      UserProfile,
      currentHTML,
      CloseModal,
      HideAndDelete,
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
