<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue";
import useClickOutSide from "../hooks/useClickOutSide";
export default defineComponent({
  name: "DropDown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const dropdownRef = ref<null | HTMLElement>(null);
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const isClickOutSide = useClickOutSide(dropdownRef);
    watch(isClickOutSide, () => {
      if (isClickOutSide.value && isOpen.value) {
        isOpen.value = false;
      }
    });
    return {
      dropdownRef,
      isOpen,
      toggleOpen,
    };
  },
});
</script>