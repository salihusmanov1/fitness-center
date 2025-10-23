<template>
  <article
    class="grid grid-cols-1 sm:grid-cols-[40%_60%]"
    role="gridcell"
    :aria-label="`Workout class: ${classType?.name}`"
  >
    <div class="w-full h-full overflow-hidden">
      <NuxtImg
        :placeholder="[50, 25, 75, 5]"
        src="/pr-session.jpg"
        :alt="`${classType?.name} workout class image`"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="h-full flex flex-col justify-center items-start gap-4 p-8 border border-gray-300 sm:border-l-0">
      <h2 class="text-sm sm:text-lg font-semibold">
        {{ classType?.name }}
      </h2>
      <p class="text-xs sm:text-sm font-light">
        {{ classType?.description }}
      </p>
      <button
        class="btn btn-primary btn-sm sm:btn-md stretched-text tracking-tighter sm:text-lg"
        :aria-label="`View ${classType?.name} sessions`"
        @click="navigateTo(`/classes/${classType?.id}`)"
      >
        View Sessions
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  classType: {
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
