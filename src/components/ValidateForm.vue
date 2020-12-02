<template>
  <form class="validata-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import mitt from "mitt";
export const emitter = mitt();
type ValidateFunc = () => Boolean;
export default defineComponent({
  name: "ValidateForm",
  emits: ["form-submit"],
  setup(props, context) {
    let funcArray: ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArray.map((func) => func()).every((result) => result);
      context.emit("form-submit", result);
    };
    const callback = (func: ValidateFunc | any) => {
      funcArray.push(func);
    };
    emitter.on("form-item-created", callback);
    onMounted(() => {
      // console.log(funcArray);
    });
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
    });
    return {
      submitForm,
    };
  },
});
</script>