<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
      class="form-control"
      v-model="inputRef.val"
      v-bind="$attrs"
    />
    <textarea
      v-else
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
      class="form-control"
      v-bind="$attrs"
      v-model="inputRef.val"
    ></textarea>
    <span class="invalid-feedback" v-if="inputRef.error">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  onMounted,
  watch,
  computed,
} from "vue";
import { emitter } from "./ValidateForm.vue";
interface RuleProp {
  type: "required" | "email" | "custom";
  message: string;
  validator?: () => boolean;
}
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
    modelValue: String,
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || "",
        set: (val) => {
          context.emit("update:modelValue", val);
        },
      }),
      error: false,
      message: "",
    });
    // watch(() => props.modelValue,(newValue) => {
    //   inputRef.val = newValue || ''
    // })
    // const updateValue = (e: KeyboardEvent) => {
    //   const targetValue = (e.target as HTMLInputElement).value;
    //   inputRef.val = targetValue;
    //   context.emit("update:modelValue", targetValue);
    // };
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
            case "custom":
              passed = rule.validator ? rule.validator() : true;
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
      // updateValue,
    };
  },
});
</script>