<template>
  <article
    class="grid grid-cols-1 w-full"
    role="gridcell"
    :aria-label="`Private training session: ${session?.name}`"
  >
    <div class="h-full flex flex-col justify-between items-start gap-4 p-6 border border-gray-300">
      <div class="w-full space-y-3">
        <div class="flex justify-between items-start">
          <h2 class="text-lg font-bold text-gray-900 flex-1">
            {{ session?.name }}
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">
            {{ session.classType }}
          </span>
        </div>
      </div>

      <div class="w-full">
        <p class="text-sm text-gray-600 leading-relaxed">
          {{ session.description }}
        </p>
      </div>

      <div class="w-full flex items-center gap-2">
        <div class="stretched-text scale-y-105 font-bold italic">
          Trainer:
        </div>

        <span class="text-sm font-medium text-gray-700">
          {{ session.trainerName }}
        </span>
      </div>

      <div class="w-full flex items-center gap-2 text-sm">
        <div>
          Price:
        </div>

        <span class="font-medium text-gray-700">
          {{ session.price }} {{ getCurrencySign(session.currency) }}
        </span>
      </div>

      <button
        class="btn btn-primary w-full stretched-text tracking-tighter text-lg"
        :aria-label="`Book ${session?.name} session`"
        @click="navigateTo(`/private-training/${session?.id}`)"
      >
        Book Session
      </button>
    </div>
  </article>
</template>

<script setup>
const { getCurrencySign } = useCurrency();

defineProps({
  session: {
    type: Object,
    required: true,
  },
});
</script>

  <style scoped>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  </style>
