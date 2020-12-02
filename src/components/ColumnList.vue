<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            class="rounded-circle border border-light w-25 my-3"
            :alt="column.title"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">
            {{ column.description }}
          </p>
          <router-link
            :to="`/column/${column.id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>b
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map((column) => {
        // console.log(column);
        if (!column.avatar) {
          column.avatar = require("../assets/avatar.jpg");
        }
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