<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.fitUrl"
            class="rounded-circle border border-light my-3"
            :alt="column.title"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">
            {{ column.description }}
          </p>
          <router-link
            :to="`/columns/${column._id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { addColumnAvatar } from "../hooks/help";
import { defineComponent, PropType, computed } from "vue";
import { ColumnProps } from "../store";
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    // console.log(props.list);
    const columnList = computed(() => {
      return props.list.map((column) => {
        // console.log(column);
        addColumnAvatar(column,50,50)
        // console.log(column);
        return column;
      });
    });
    // console.log(columnList);
    return {
      columnList,
    };
  },
});
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>