<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items center">
      <div class="col-3 text-center">
        <img
          src="http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"
          class="rounded-circle border w-100"
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
import { useStore } from "vuex";
import { ColumnProps, GlobalDataProps } from "../store";
import PostList from "../components/PostList.vue";
import { defineComponent, computed, onMounted, PropType } from "vue";
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
    })
    // onMounted(() => {
    //   store.dispatch('fetchColumn', currentId)
    //   store.dispatch('fetchPosts', { columnId: currentId, pageSize: 3 })
    // })
    // const column = computed(() => store.getters.getColumnById(currentId))
    // console.log(store.state.columns);
    // const column = computed(() => {
    const column = computed(() => store.getters.getColumnById(currentId))
    const post = computed(() => store.getters.getPostByCid(currentId));
    // console.log(column.value);
    return {
      column,
      post,
    };
    components: {
      PostList
    }
  },
});
</script>

<style></style>
