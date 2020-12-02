<template>
  <li :class="{ 'is-disabled': disabled }" class="dropdown-option">
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DropDownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style>
.dropdown-option.is-disabled *{
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>