<template>
  <article
    class="grid grid-cols-1 sm:grid-cols-[40%_60%]"
    role="gridcell"
    :aria-label="`Workout session: ${session?.class_type?.name}`"
  >
    <div class="w-full h-full overflow-hidden">
      <NuxtImg
        src="/pr-session.jpg"
        :alt="`${session?.class_type?.name} workout session image`"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="h-full flex flex-col justify-center items-start gap-4 p-8 border border-gray-300 sm:border-l-0">
      <h2 class="text-sm sm:text-lg font-semibold">
        {{ session?.class_type?.name }}
      </h2>
      <div class="text-xs sm:text-sm font-light">
        <p>
          <span class="sr-only">Duration: </span>{{ session.duration_minutes }} minutes
        </p>
        <p>
          <span class="sr-only">Price: </span>{{ session.price }} {{ getCurrencySign(session.currency) }}
        </p>
      </div>

      <button
        class="btn btn-primary btn-sm sm:btn-md stretched-text tracking-tighter sm:text-lg"
        :aria-label="`Book ${session?.class_type?.name} session for ${session.price} ${getCurrencySign(session.currency)}`"
        @click="navigateTo(`/session/${session.id}`)"
      >
        Book Now
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
