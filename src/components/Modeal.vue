<template to="#modal">
  <div class="modal" tabindex="-1" role="dialog" v-if="isVisible">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" @click="close">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button @click="close" type="button" class="btn btn-secondary" data-dismiss="modal">
            关闭
          </button>
          <button @click="confirm" type="button" class="btn btn-primary">确定删除</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import useDOMCreate from "../hooks/useDOMCreate";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    title: String,
    isVisible: {
      type: Boolean,
      defualt: false,
    },
  },
  emits: ["modal-close", "modal-confirm"],
  setup(props, context) {
    useDOMCreate("modal");
    const close = () => {
      context.emit("modal-close");
    };
    const confirm = () => {
      context.emit("modal-confirm");
    };
    return {
      close,
      confirm,
    };
  },
});
</script>


<style>
</style>
