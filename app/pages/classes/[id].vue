<template>
  <div class="p-4">
    <section class="min-h-[250px] text-center flex flex-col items-center gap-4 justify-end">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        {{ classTypeName?.toUpperCase() }} SESSIONS
      </h1>

      <p class="sm:text-xl text-lg font-light">
        Available Sessions for {{ classTypeName }}
      </p>
    </section>

    <section
      class="lg:max-w-[1200px] mx-auto flex items-center my-20 flex-col gap-8"
      aria-label="Sessions listing"
    >
      <ClassesSessionFilters
        v-model:filters="filters"
      />
      <template v-if="displayedSessions.length === 0">
        <div
          class="w-full flex flex-col items-center justify-center gap-4"
          role="status"
          aria-live="polite"
        >
          <Icon
            name="bx:search-alt"
            class="text-primary"
            size="48px"
            aria-hidden="true"
          />
          <p class="text-center">
            No sessions found for {{ classTypeName }} on {{ selectedDate.toLocaleDateString() }}
          </p>
        </div>
      </template>

      <template v-if="!!error">
        <div
          class="flex flex-col gap-8 items-center justify-center"
          role="alert"
          aria-live="assertive"
        >
          <p class="text-error">
            Failed to load sessions. Please try again.
          </p>
          <button
            class="btn btn-primary btn-outline"
            :aria-label="status === 'pending' ? 'Refreshing sessions' : 'Refresh sessions'"
            :disabled="status === 'pending'"
            @click="refresh"
          >
            <span
              v-if="status === 'pending'"
              class="loading loading-spinner"
              aria-hidden="true"
            />
            Refresh
          </button>
        </div>
      </template>

      <template v-else>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative w-full"
          role="grid"
          aria-label="Available workout sessions"
        >
          <div
            v-if="status === 'pending'"
            class="absolute inset-0 bg-white/50 z-10"
            role="status"
            aria-live="polite"
            aria-label="Loading sessions"
          >
            <div class="flex items-center justify-center h-full">
              <div
                class="loading loading-bars loading-lg"
                aria-hidden="true"
              />
              <span class="sr-only">Loading sessions, please wait</span>
            </div>
          </div>

          <template
            v-for="(session, index) in displayedSessions"
            :key="index"
          >
            <SessionsCard
              :session="session"
            />
          </template>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup>
import qs from "qs";

const client = useSanctumClient();
const route = useRoute();
const { id } = route.params;

const displayedSessions = ref([]);

const filters = ref({
  date: "",
  time: "",
});

const filtersObj = computed(() => ({
  filters: {
    date: { $eq: filters.value.date },
  },
}));

const queryString = computed(() => qs.stringify(filtersObj.value, { encode: false }));

const { data, status, error, refresh } = await useAsyncData(`sessions-${id}`, () =>
  client(`/api/class_types/${id}?${queryString.value}`), {
  watch: [queryString],
});

watch(queryString, (newQueryString) => {
  console.log(newQueryString);
});

watch(filtersObj, (newFilters) => {
  console.log(newFilters);
});

watch(() => filters.value, (newFilters) => {
  console.log(newFilters);
}, { deep: true });

const classTypeName = computed(() => {
  return data?.value?.data?.name;
});

watch(() => data.value?.data?.sessions, (sessions) => {
  if (sessions) {
    displayedSessions.value = sessions;
  }
}, { immediate: true });

if (error.value && error.value.statusCode === 404) {
  showError({
    statusCode: 404,
    statusMessage: "Class type not found",
  });
}
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
