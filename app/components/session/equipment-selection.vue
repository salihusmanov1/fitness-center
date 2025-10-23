<template>
  <div class="space-y-4">
    <div class="bg-base-200 p-4 border border-gray-300">
      <div class="flex items-start gap-3">
        <Icon
          name="bx:info-circle"
          size="20px"
          class="text-primary mt-0.5 flex-shrink-0"
        />
        <div>
          <h3 class="text-lg font-semibold stretched-text text-base-content mb-1">
            Equipment Selection Required
          </h3>
          <p class="text-sm text-base-content/70">
            Please take a look at the 360° panorama view above to see the available equipment positions,
            then select your preferred machine/position below.
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm text-base-content/70">
          {{ availableEquipment.length }} positions available
        </span>
        <span class="text-xs text-base-content/50">
          {{ selectedEquipment ? `Selected: ${selectedEquipment.name}` : 'No selection' }}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="(eq, index) in availableEquipment"
          :key="index"
          class="btn btn-outline transition-all duration-200 stretched-text scale-y-105 font-bold text-lg relative"
          :disabled="!eq.available"
          @click="selectEquipment(eq)"
        >
          <div class="flex items-center gap-1">
            <span>{{ eq.name }}</span>
            <span
              v-if="!eq.available"
              class="text-xs"
            >
              (Occupied)
            </span>
          </div>

          <div
            v-if="selectedEquipment?.id === eq.id"
            class="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-content rounded-full flex items-center justify-center text-xs"
          >
            <Icon
              name="bx:check"
              size="12px"
            />
          </div>
        </button>
      </div>
    </div>

    <div
      v-if="selectedEquipment"
      class="bg-primary/5 border border-primary/20 p-4"
    >
      <h4 class="text-base font-semibold stretched-text text-base-content mb-2">
        Selected Equipment Details
      </h4>
      <div class="space-y-1 text-sm">
        <p class="flex justify-between">
          <span class="text-base-content/70">Position:</span>
          <span class="font-medium">{{ selectedEquipment.name }}</span>
        </p>
        <p class="flex justify-between">
          <span class="text-base-content/70">Type:</span>
          <span class="font-medium">{{ selectedEquipment.type }}</span>
        </p>
        <p class="flex justify-between">
          <span class="text-base-content/70">Location:</span>
          <span class="font-medium">{{ selectedEquipment.location }}</span>
        </p>
        <p
          v-if="selectedEquipment.description"
          class="text-base-content/70 mt-2"
        >
          {{ selectedEquipment.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  equipment: {
    type: Array,
    default: () => [],
  },
});

const selectedEquipment = useState("selectedEquipment", () => null);

const availableEquipment = computed(() => {
  if (props.equipment && props.equipment.length > 0) {
    return props.equipment;
  }

  return [
    {
      id: 1,
      name: "Machine 1",
      type: "Reformer",
      location: "Front Left",
      available: true,
      description: "Classic Pilates reformer with adjustable springs",
    },
    {
      id: 2,
      name: "Machine 2",
      type: "Reformer",
      location: "Front Right",
      available: true,
      description: "Classic Pilates reformer with adjustable springs",
    },
    {
      id: 3,
      name: "Machine 3",
      type: "Cadillac",
      location: "Center Left",
      available: false,
      description: "Trapeze table with overhead bars and springs",
    },
    {
      id: 4,
      name: "Machine 4",
      type: "Reformer",
      location: "Center Right",
      available: true,
      description: "Classic Pilates reformer with adjustable springs",
    },
    {
      id: 5,
      name: "Machine 5",
      type: "Chair",
      location: "Back Left",
      available: true,
      description: "Wunda chair for seated and standing exercises",
    },
    {
      id: 6,
      name: "Machine 6",
      type: "Reformer",
      location: "Back Right",
      available: true,
      description: "Classic Pilates reformer with adjustable springs",
    },
    {
      id: 7,
      name: "Machine 7",
      type: "Mat",
      location: "Center Floor",
      available: true,
      description: "Floor mat for mat-based Pilates exercises",
    },
  ];
});

const selectEquipment = (equipment) => {
  if (!equipment.available) return;

  selectedEquipment.value = equipment;
};

watch(() => props.equipment, (newEquipment) => {
  if (newEquipment && newEquipment.length > 0) {
    selectedEquipment.value = null;
  }
}, { deep: true });
</script>

<style scoped>

</style>
