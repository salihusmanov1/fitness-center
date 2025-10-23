<template>
  <article
    class="grid grid-cols-1 w-full"
    role="gridcell"
    :aria-label="`Workout session: ${session?.name}`"
  >
    <div class="h-full flex flex-col justify-center items-start gap-4 p-8 border border-gray-300">
      <h2 class="text-sm sm:text-lg font-semibold">
        {{ session?.name }}
      </h2>
      <div class="text-sm sm:text-base font-light">
        <p>
          <span class="font-bold">Date: </span>{{ date }}
        </p>
        <p>
          <span class="font-bold">Time: </span>{{ time }}
        </p>
        <p>
          <span class="font-bold">Duration: </span>{{ session.duration_minutes }} minutes
        </p>
        <p>
          <span class="font-bold">Price: </span>{{ session.price }} {{ getCurrencySign(session.currency) }}
        </p>
      </div>

      <button
        class="btn btn-primary stretched-text tracking-tighter text-lg"
        :aria-label="`Book ${session?.name} session`"
        @click="navigateTo(`/session/${session?.id}`)"
      >
        Book
      </button>
    </div>
  </article>
</template>

<script setup>
const { getCurrencySign } = useCurrency();
const { formatTime } = useTimeFormatter();

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
});

const { date, time } = formatTime(props.session.start_at);
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
