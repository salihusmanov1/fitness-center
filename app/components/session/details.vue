<template>
  <div class="space-y-2">
    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Class: </span> {{ session.name || "-" }}
    </p>

    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Trainer: </span>
      <span class="font-light">
        {{ session?.trainer?.name || "-" }}
      </span>
    </p>

    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Starting Date: </span>
      <span class="text-primary font-light">
        {{ date }}
      </span>
    </p>
    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Starting Time: </span>
      <span class="text-primary font-light">
        {{ time }}
      </span>
    </p>
    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Equipment: </span>
      <span
        class="font-light"
        :class="!selectedEquipment ? 'text-error' : 'text-primary'"
      >
        {{ selectedEquipment?.name || "No equipment selected" }}
      </span>
    </p>
    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Bookings: </span>
      <span class="text-primary font-light">
        {{ session?.bookings_count }} out of {{ session?.capacity }}
      </span>
    </p>
    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Price: </span>
      <span class="text-primary font-light">
        {{ session.price || "-" }}
      </span>
    </p>
    <p class="flex items-center justify-between">
      <span class="text-lg font-semibold stretched-text text-base-content">Duration: </span>
      <span class="text-primary font-light">
        {{ session.duration_minutes || "-" }} minutes
      </span>
    </p>

    <div
      v-if="showAlertMessage"
      class="alert alert-warning my-4"
    >
      <Icon
        name="bx:info-circle"
        size="20px"
      />
      <span>Please select your preferred equipment before proceeding.</span>
    </div>

    <button
      class="btn btn-primary btn-block my-10"
      @click="handleNavigateNext"
    >
      Next
    </button>
  </div>
</template>

<script setup>
const { formatTime } = useTimeFormatter();
const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
  isPilatesSession: {
    type: Boolean,
    default: false,
  },
});

const { date, time } = formatTime(props.session.start_at);

const selectedEquipment = useState("selectedEquipment");
const showAlertMessage = ref(false);

const emits = defineEmits(["navigateNext"]);

const canProceed = computed(() => {
  if (!props.isPilatesSession && !selectedEquipment.value) {
    return false;
  }
  return true;
});

const handleNavigateNext = () => {
  if (!canProceed.value) {
    showAlertMessage.value = true;
    return;
  }
  showAlertMessage.value = false;
  emits("navigateNext");
};
</script>

<style lang="scss" scoped></style>
