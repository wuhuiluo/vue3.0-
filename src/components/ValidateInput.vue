<template>
  <div class="validate-input-container pb-3">
    <input
      @blur="validateInput"
      type="text"
      :class="{ 'is-invalid': inputRef.error }"
      class="form-control"
      :value="inputRef.val"
      v-bind="$attrs"
      @input="updateValue"
    />
    <span class="invalid-feedback" v-if="inputRef.error">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from "vue";
import { emitter } from "./ValidateForm.vue";
interface RuleProp {
  type: "required" | "email";
  message: string;
}
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const allpassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allpassed;
        return allpassed;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>