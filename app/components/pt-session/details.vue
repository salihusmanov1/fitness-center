<template>
  <div class="space-y-2">
    <p class="text-lg font-semibold stretched-text text-base-content">
      {{ session.name }}
    </p>
    <p class="text-primary font-light">
      {{ selectedDate }} - {{ selectedTime?.time }}
    </p>

    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Trainer: </span>
      <span class="text-primary font-light">
        {{ session?.trainerName }}
      </span>
    </p>
    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Price: </span>
      <span class="text-primary font-light">
        {{ session.price }} {{ getCurrencySign(session.currency) }}
      </span>
    </p>
    <p class="text-primary font-light">
      {{ session.duration }}
    </p>
    <button
      class="btn btn-primary btn-block my-10"
      @click="emits('navigateNext')"
    >
      Next
    </button>
  </div>
</template>

<script setup>
const { getCurrencySign } = useCurrency();

defineProps({
  session: {
    type: Object,
    required: true,
  },
  selectedTime: {
    type: Object,
    default: null,
  },
  selectedDate: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["navigateNext"]);
</script>

  <style lang="scss" scoped>

  </style>
