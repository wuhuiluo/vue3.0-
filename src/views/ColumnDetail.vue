<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      v-if="column"
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.fitUrl"
          class="rounded-circle border w-100"
          :alt="column.title"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list v-if="post" :list="post"></post-list>
  </div>
</template>

<script lang="ts">
import { addColumnAvatar } from "../hooks/help";
import { useStore } from "vuex";
import { ColumnProps, GlobalDataProps, PostProps } from "../store";
import PostList from "../components/PostList.vue";
import { defineComponent, computed, onMounted, PropType, watch } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const route = useRoute();
    const currentId = route.params.id;
    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", currentId);
    });
    const column = computed(() => {
      const columnList = store.getters.getColumnById(currentId) as
        | ColumnProps
        | undefined;
      if (columnList) {
        addColumnAvatar(columnList, 100, 100);
      }
      return columnList;
    });
    const post = computed(() => store.getters.getPostByCid(currentId));
    watch(store.state.posts, () => {
      store.dispatch("fetchPosts", currentId);
    });
    // console.log(post);
    // const post = computed(() => store.getters.getPostByCid(currentId));
    // // console.log(post);
    return {
      column,
      post,
    };
    components: {
      PostList;
    }
  },
});
</script>

<style></style>
