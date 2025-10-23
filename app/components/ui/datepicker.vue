<template>
  <fieldset class="fieldset w-full">
    <legend
      v-if="label"
      class="fieldset-legend font-medium text-sm"
    >
      {{ label }}<span
        v-if="required"
        class="text-red-500"
      > {{ required ? "*" : "" }}</span>
    </legend>

    <div class="relative w-full">
      <label class="input w-full bg-base-300">
        <input
          ref="inputRef"
          v-model="modelValue"
          :placeholder="placeholder"
          :readonly="!allowManualInput"
          class="input focus:outline-none w-full cursor-pointer"
          :class="{ 'border-red-500': error !== '' }"
          @click="toggleCalendar"
          @keydown="handleKeydown"
          @blur="handleBlur"
        >
        <Icon
          name="bx:calendar-alt"
          size="18px"
        />
      </label>

      <div
        v-if="isOpen"
        ref="calendarRef"
        class="absolute top-full left-0 mt-1 bg-base-100 border border-base-300 z-50 p-4 w-full"
      >
        <UiCalendar
          :selected-date="dateObj"
          @update:model-value="selectDate"
        />
      </div>
    </div>
  </fieldset>
</template>

<script setup>
const modelValue = defineModel({
  type: String,
  default: "",
});

defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select a date",
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  allowManualInput: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(false);
const inputRef = ref(null);
const calendarRef = ref(null);
const dateObj = ref(null);

const selectDate = (date) => {
  modelValue.value = useDateFormat(date, "DD-MM-YYYY").value;
  dateObj.value = date;
  isOpen.value = false;
};

const toggleCalendar = () => {
  isOpen.value = !isOpen.value;
};

const handleKeydown = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleCalendar();
  }
  else if (event.key === "Escape") {
    isOpen.value = false;
  }
};

const handleBlur = (_event) => {
  setTimeout(() => {
    if (!calendarRef.value?.contains(document.activeElement)) {
      isOpen.value = false;
    }
  }, 100);
};

onMounted(() => {
  const handleClickOutside = (event) => {
    if (isOpen.value && !calendarRef.value?.contains(event.target) && !inputRef.value?.contains(event.target)) {
      isOpen.value = false;
    }
  };

  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});
</script>

<style scoped>

</style>
