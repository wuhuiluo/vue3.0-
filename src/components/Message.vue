<template>
  <teleport to="#message">
    <div
      v-if="isVisible"
      class="alert message-info d-flex justify-content-between mt-2 fixed-top w-50 mx-auto"
      :class="classObject"
      role="alert"
    >
      <span>{{ message }}</span>
      <button
        @click.prevent="hide"
        type="button"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>


<script lang="ts">
import useDOMCreate from "../hooks/useDOMCreate";
import { defineComponent, PropType, ref } from "vue";
export type MessageType = "success" | "error" | "default";
export default defineComponent({
  name: "message",
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: "default",
    },
  },
  emits: ["close-message"],
  setup(props, context) {
    useDOMCreate("message");
    // const node = document.createElement("div");
    // node.id = "message";
    // document.body.appendChild(node);
    const isVisible = ref(true);
    const classObject = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-primary": props.type === "default",
    };
    const hide = () => {
      isVisible.value = false;
      context.emit("close-message", true);
    };
    return {
      isVisible,
      classObject,
      hide,
    };
  },
});
</script>


<style>
</style>
