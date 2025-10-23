<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center py-8"
    >
      <div class="loading loading-spinner loading-md text-primary" />
    </div>

    <div
      v-else-if="Object.keys(error).length > 0"
      class="alert alert-error"
    >
      <Icon
        name="mdi:alert-circle"
        size="20px"
      />
      <span>Failed to load available times. Please try again.</span>
    </div>

    <div
      v-else-if="data?.isWeekend"
      class="text-center py-8"
    >
      <div class="bg-base-200 rounded-lg p-6">
        <Icon
          name="mdi:calendar-weekend"
          size="48px"
          class="text-primary mx-auto mb-4"
        />
        <h3 class="text-xl font-semibold stretched-text text-base-content mb-2">
          No Sessions Available
        </h3>
        <p class="text-base-content/70">
          We don't offer sessions on weekends. Please select a weekday to see available times.
        </p>
      </div>
    </div>

    <div
      v-else-if="data?.availableTimes?.length"
      class="space-y-4"
    >
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm text-base-content/70">
          {{ data.availableTimes.length }} slots available
        </span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="timeSlot in data.availableTimes"
          :key="timeSlot.id"
          :class="[
            'btn transition-all duration-200 stretched-text scale-y-105 font-bold text-lg',
            {
              'btn-primary': selectedTime?.id === timeSlot.id,
              'btn-outline': selectedTime?.id !== timeSlot.id,
              'hover:btn-primary': selectedTime?.id !== timeSlot.id,
            },
          ]"
          @click="selectTime(timeSlot)"
        >
          {{ timeSlot.time }}
        </button>
      </div>
    </div>

    <div
      v-else
      class="text-center py-8"
    >
      <div class="bg-base-200 rounded-lg p-6">
        <Icon
          name="mdi:clock-outline"
          size="48px"
          class="text-base-content/50 mx-auto mb-4"
        />
        <h3 class="text-xl font-semibold stretched-text text-base-content mb-2">
          No Times Available
        </h3>
        <p class="text-base-content/70">
          All time slots for this date are currently booked. Please try another date.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedDate: {
    type: Date,
    default: null,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update-selected-time"]);

const selectedTime = ref(null);

watch(() => props.data.availableTimes, (val) => {
  if (val) {
    selectedTime.value = { ...val[0] };
    emit("update-selected-time", { ...val[0] });
  }
  else {
    selectedTime.value = {};
    emit("update-selected-time", null);
  }
}, { immediate: true });

const selectTime = (timeSlot) => {
  selectedTime.value = timeSlot;
  emit("update-selected-time", timeSlot);
};
</script>

<style scoped>

</style>
