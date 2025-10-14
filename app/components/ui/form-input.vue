<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend font-medium text-sm">
      {{ label }}<span
        v-if="required"
        class="text-red-500"
      > {{ required ? "*" : "" }}</span>
    </legend>
    <input
      v-model="modelValue"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="input focus:outline-none w-full bg-base-300"
      :class="{ 'border-red-500': error !== '' }"
    >
    <p class="text-red-500 h-4">
      {{ error || "" }}
    </p>
  </fieldset>
</template>

<script setup>
const modelValue = defineModel({
  type: String,
  default: "",
});

const { label, required, error, name, type, placeholder } = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
